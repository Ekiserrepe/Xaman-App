/**
 * Send / Recipient step
 */

import React, { Component } from 'react';
import { Results } from 'realm';
import { isEmpty, flatMap, remove, get, uniqBy, toNumber } from 'lodash';
import { View, Text, SectionList, Alert, RefreshControl } from 'react-native';
import { StringType, XrplDestination } from 'xumm-string-decode';

import { AccountRepository, ContactRepository } from '@store/repositories';
import { ContactSchema, AccountSchema } from '@store/schemas/latest';

import { AppScreens } from '@common/constants';
import { getAccountName, getAccountInfo } from '@common/helpers/resolver';
import { Toast } from '@common/helpers/interface';
import { Navigator } from '@common/helpers/navigator';

import { Amount } from '@common/libs/ledger/parser/common';

import { NormalizeCurrencyCode } from '@common/utils/amount';
import { NormalizeDestination } from '@common/utils/codec';

import { BackendService, LedgerService, StyleService } from '@services';

// components
import { Button, TextInput, Footer, InfoMessage } from '@components/General';
import { RecipientElement } from '@components/Modules';

// locale
import Localize from '@locale';

// style
import { AppStyles } from '@theme';
import styles from './styles';

// context
import { StepsContext } from '../../Context';

/* types ==================================================================== */
export interface Props {}

export interface State {
    isSearching: boolean;
    isLoading: boolean;
    searchText: string;
    accounts: Results<AccountSchema>;
    contacts: Results<ContactSchema>;
    dataSource: any[];
}
/* Component ==================================================================== */
class RecipientStep extends Component<Props, State> {
    lookupTimeout: any;
    sequence: number;

    static contextType = StepsContext;
    context: React.ContextType<typeof StepsContext>;

    constructor(props: Props) {
        super(props);

        this.state = {
            isSearching: false,
            isLoading: false,
            searchText: '',
            accounts: AccountRepository.getAccounts({ hidden: false }).sorted([['order', false]]),
            contacts: ContactRepository.getContacts(),
            dataSource: [],
        };

        this.lookupTimeout = null;
        this.sequence = 0;
    }

    componentDidMount() {
        const { scanResult } = this.context;

        // check any scan result exist
        if (scanResult) {
            this.doAccountLookUp(scanResult);
        } else {
            this.setDefaultDataSource();
        }
    }

    componentWillUnmount() {
        if (this.lookupTimeout) clearTimeout(this.lookupTimeout);
    }

    doAccountLookUp = async (result: XrplDestination) => {
        const { setDestination } = this.context;

        this.setState({
            searchText: result.to,
            isSearching: true,
        });

        const { to, tag } = NormalizeDestination(result);

        if (to) {
            const accountInfo = await getAccountName(to, tag);

            this.setState({
                dataSource: this.getSearchResultSource([
                    {
                        name: accountInfo.name || '',
                        address: to,
                        tag,
                        source: accountInfo.source,
                        kycApproved: accountInfo.kycApproved,
                    },
                ]),
                isSearching: false,
            });

            // select as destination
            setDestination({ name: accountInfo.name || '', address: to, tag: toNumber(tag) || undefined });
        } else {
            this.doLookUp(result.to);
        }
    };

    setSearchResult = (searchResult: any) => {
        const { destination, setDestination } = this.context;

        // if search result only have one result select it
        if (searchResult && searchResult.length === 1) {
            const onlyResult = searchResult[0];
            // select as destination
            if (!destination || (onlyResult.address !== destination.address && onlyResult.tag !== destination.tag)) {
                setDestination({
                    name: onlyResult.name || '',
                    address: onlyResult.address,
                    tag: toNumber(onlyResult.tag) || undefined,
                });
            }
        } else if (destination) {
            setDestination(undefined);
        }

        this.setState({
            dataSource: this.getSearchResultSource(searchResult),
            isSearching: false,
        });
    };

    doLookUp = (searchText: string) => {
        const { contacts, accounts } = this.state;

        clearTimeout(this.lookupTimeout);

        this.lookupTimeout = setTimeout(() => {
            // set searching true
            this.setState({
                isSearching: true,
            });

            // increase sequence
            this.sequence += 1;
            // get a copy of sequence
            const { sequence } = this;

            // create empty search result array
            const searchResult = [] as any;

            // search for contacts
            contacts.forEach((item) => {
                if (
                    item.name?.toLowerCase().indexOf(searchText?.toLowerCase()) !== -1 ||
                    item.address?.toLowerCase().indexOf(searchText?.toLowerCase()) !== -1
                ) {
                    searchResult.push({
                        name: item.name,
                        address: item.address,
                        tag: item.destinationTag,
                        source: 'contacts',
                    });
                }
            });

            // search for accounts
            accounts.forEach((item) => {
                if (
                    item.label?.toLowerCase().indexOf(searchText?.toLowerCase()) !== -1 ||
                    item.address?.toLowerCase().indexOf(searchText?.toLowerCase()) !== -1
                ) {
                    searchResult.push({
                        name: item.label,
                        address: item.address,
                        source: 'accounts',
                    });
                }
            });

            // if text length is more than 4 do server lookup
            if (searchText?.length >= 4) {
                BackendService.lookup(searchText)
                    .then((res: any) => {
                        if (!isEmpty(res) && res.error !== true) {
                            if (!isEmpty(res.matches)) {
                                res.matches.forEach(async (element: any) => {
                                    // if payid in result, then look for payId in local source as well
                                    if (element.source === 'payid') {
                                        const internalResult = await getAccountName(element.account, element.tag, true);

                                        // found in local source
                                        if (internalResult.name) {
                                            searchResult.push({
                                                name: internalResult.name || '',
                                                address: element.account,
                                                tag: element.tag,
                                                source: internalResult.source,
                                            });

                                            return;
                                        }
                                    }

                                    searchResult.push({
                                        name: element.alias === element.account ? '' : element.alias,
                                        address: element.account,
                                        source: element.source,
                                        tag: element.tag,
                                        kycApproved: element.kycApproved,
                                    });
                                });
                            }
                        }
                    })
                    .catch(() => {})
                    .finally(() => {
                        // this will make sure the latest call will apply
                        if (sequence === this.sequence) {
                            this.setSearchResult(searchResult);
                        }
                    });
            } else if (sequence === this.sequence) {
                // this will make sure the latest call will apply
                this.setSearchResult(searchResult);
            }
        }, 500);
    };

    onSearch = (searchText: string) => {
        const { setDestination } = this.context;

        this.setState({
            searchText,
        });

        if (searchText && searchText.length > 0) {
            // check if it's a xrp address
            const possibleAccountAddress = new RegExp(
                /[rX][rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz]{23,50}/,
            );

            if (possibleAccountAddress.test(searchText)) {
                this.doAccountLookUp({ to: searchText });
            } else {
                this.doLookUp(searchText);
            }
        } else {
            clearTimeout(this.lookupTimeout);
            // get default source
            this.setDefaultDataSource();
            // clear the destination if set
            setDestination(undefined);
        }
    };

    getSearchResultSource = (searchResult: any) => {
        const dataSource = [];

        if (searchResult && searchResult.length > 0) {
            dataSource.push({
                title: Localize.t('send.searchResults'),
                data: uniqBy(searchResult, 'address'),
            });
        }

        return dataSource;
    };

    setDefaultDataSource = () => {
        const { source } = this.context;
        const { contacts, accounts } = this.state;

        const dataSource = [];

        const myAccountList = remove(Array.from(accounts), (n) => {
            // remove source account from list
            return n.address !== source.address;
        });

        if (myAccountList && myAccountList.length !== 0) {
            dataSource.push({
                title: Localize.t('account.myAccounts'),
                data: flatMap(myAccountList, (a) => {
                    return { name: a.label, address: a.address };
                }),
            });
        }

        if (contacts && contacts.length === 0) {
            dataSource.push({
                title: Localize.t('global.contacts'),
                data: [{ empty: true, title: Localize.t('send.noContact') }],
            });
        } else {
            dataSource.push({
                title: Localize.t('global.contacts'),
                data: flatMap(contacts, (a) => {
                    return {
                        name: a.name,
                        address: a.address,
                        tag: a.destinationTag,
                    };
                }),
            });
        }

        this.setState({
            dataSource,
        });
    };

    showEnterDestinationTag = () => {
        const { setDestination, destination } = this.context;

        if (!destination) {
            return;
        }

        Navigator.showOverlay(AppScreens.Overlay.EnterDestinationTag, {
            buttonType: 'next',
            destination,
            onFinish: (destinationTag: string) => {
                Object.assign(destination, { tag: destinationTag });
                setDestination(destination);
                this.goNext();
            },
            onScannerRead: ({ tag }: { tag: number }) => {
                Object.assign(destination, { tag: String(tag) });
                setDestination(destination);

                this.showEnterDestinationTag();
            },
            onScannerClose: this.showEnterDestinationTag,
        });
    };

    clearDestination = () => {
        const { setDestination, setDestinationInfo } = this.context;

        setDestination(undefined);
        setDestinationInfo(undefined);
    };

    resetResult = () => {
        const { setDestination } = this.context;

        setDestination(undefined);

        this.setState(
            {
                searchText: '',
            },
            this.setDefaultDataSource,
        );
    };

    checkAndNext = async () => {
        const { setDestinationInfo, amount, currency, destination, source } = this.context;

        try {
            this.setState({
                isLoading: true,
            });

            // check for same destination as source
            if (destination.address === source.address) {
                Alert.alert(Localize.t('global.error'), Localize.t('send.sourceAndDestinationCannotBeSame'));
                // don't move to next step
                return;
            }

            // check for account exist and potential destination tag required
            const destinationInfo = await getAccountInfo(destination.address);

            // set destination account info
            setDestinationInfo(destinationInfo);

            // account doesn't exist no need to check account risk
            if (!destinationInfo.exist) {
                // account does not exist and cannot activate with IOU
                if (typeof currency !== 'string') {
                    Navigator.showAlertModal({
                        type: 'warning',
                        text: Localize.t('send.destinationCannotActivateWithIOU', {
                            baseReserve: LedgerService.getNetworkReserve().BaseReserve,
                        }),
                        buttons: [
                            {
                                text: Localize.t('global.back'),
                                onPress: this.clearDestination,
                                type: 'dismiss',
                                light: false,
                            },
                        ],
                    });

                    // don't move to next step
                    return;
                }

                // check if amount is not covering the creation of account
                if (
                    typeof currency === 'string' &&
                    parseFloat(amount) < LedgerService.getNetworkReserve().BaseReserve
                ) {
                    Navigator.showAlertModal({
                        type: 'warning',
                        text: Localize.t('send.destinationNotExistTooLittleToCreate', {
                            baseReserve: LedgerService.getNetworkReserve().BaseReserve,
                        }),
                        buttons: [
                            {
                                text: Localize.t('global.back'),
                                onPress: this.clearDestination,
                                type: 'dismiss',
                                light: false,
                            },
                        ],
                    });

                    // don't move to next step
                    return;
                }

                // check if the amount will create the account
                if (
                    typeof currency === 'string' &&
                    parseFloat(amount) >= LedgerService.getNetworkReserve().BaseReserve
                ) {
                    Navigator.showAlertModal({
                        type: 'warning',
                        text: Localize.t('send.destinationNotExistCreationWarning', {
                            amount,
                            baseReserve: LedgerService.getNetworkReserve().BaseReserve,
                        }),
                        buttons: [
                            {
                                text: Localize.t('global.back'),
                                onPress: this.clearDestination,
                                type: 'dismiss',
                                light: true,
                            },
                            {
                                text: Localize.t('global.continue'),
                                onPress: this.goNext,
                                type: 'continue',
                                light: false,
                            },
                        ],
                    });

                    // don't move to next step
                    return;
                }
            }

            // check if recipient have same trustline for sending IOU
            if (typeof currency === 'object') {
                const destinationLine = await LedgerService.getAccountLine(destination.address, currency.currency);

                if (!destinationLine && currency.currency.issuer !== destination.address) {
                    Navigator.showAlertModal({
                        type: 'error',
                        text: Localize.t('send.unableToSendPaymentRecipientDoesNotHaveTrustLine'),
                        buttons: [
                            {
                                text: Localize.t('global.ok'),
                                onPress: this.clearDestination,
                                light: false,
                            },
                        ],
                    });

                    // don't move to next step
                    return;
                }
            }

            // if account is set to black hole then reject sending
            if (destinationInfo.blackHole) {
                Navigator.showAlertModal({
                    type: 'warning',
                    text: Localize.t('send.theDestinationAccountIsSetAsBlackHole', {
                        currency:
                            typeof currency === 'object' ? NormalizeCurrencyCode(currency.currency.currency) : 'XRP',
                    }),
                    buttons: [
                        {
                            text: Localize.t('global.back'),
                            onPress: this.clearDestination,
                            type: 'dismiss',
                            light: false,
                        },
                    ],
                });

                // don't move to next step
                return;
            }

            // check for account risk and scam
            if (destinationInfo.risk === 'PROBABLE' || destinationInfo.risk === 'HIGH_PROBABILITY') {
                Navigator.showAlertModal({
                    type: 'warning',
                    text: Localize.t('send.destinationIsProbableIsScam'),
                    buttons: [
                        {
                            text: Localize.t('global.back'),
                            onPress: this.resetResult,
                            type: 'dismiss',
                            light: false,
                        },
                        {
                            text: Localize.t('global.continue'),
                            onPress: this.goNext,
                            type: 'continue',
                            light: true,
                        },
                    ],
                });

                // don't move to next step
                return;
            }

            if (destinationInfo.risk === 'CONFIRMED') {
                Navigator.showOverlay(AppScreens.Overlay.FlaggedDestination, {
                    destination: destination.address,
                    onContinue: this.goNext,
                    onDismissed: this.resetResult,
                });

                // don't move to next step
                return;
            }

            // check for xrp income disallow
            if (destinationInfo.disallowIncomingXRP && typeof currency === 'string') {
                Navigator.showAlertModal({
                    type: 'warning',
                    text: Localize.t('send.sendToAccountWithDisallowXrpFlagWarning'),
                    buttons: [
                        {
                            text: Localize.t('global.back'),
                            onPress: this.clearDestination,
                            type: 'dismiss',
                            light: false,
                        },
                        {
                            text: Localize.t('global.continue'),
                            onPress: this.goNext,
                            type: 'continue',
                            light: true,
                        },
                    ],
                });

                // don't move to next step
                return;
            }

            // check for destination tag require
            if (destinationInfo.requireDestinationTag && (!destination.tag || Number(destination.tag) === 0)) {
                this.showEnterDestinationTag();

                // don't move to next step
                return;
            }
        } catch {
            Toast(Localize.t('send.unableGetRecipientAccountInfoPleaseTryAgain'));
            return;
        } finally {
            this.setState({ isLoading: false });
        }

        // go to the next step if everything was fine
        this.goNext();
    };

    onScannerRead = (content: any) => {
        if (content.payId) {
            this.doAccountLookUp({ to: content.payId });
        } else {
            this.doAccountLookUp(content);
        }
    };

    goNext = async () => {
        const { goNext, setFee, setIssuerFee, currency, payment } = this.context;

        try {
            this.setState({
                isLoading: true,
            });

            // sending IOU
            if (typeof currency !== 'string') {
                // fetching/applying issuer fee from network
                const issuerFee = await LedgerService.getAccountTransferRate(currency.currency.issuer);
                if (issuerFee) {
                    setIssuerFee(issuerFee);
                }
            }

            // calculate and persist the transaction fee
            const { Fee: BaseFee } = LedgerService.getLedgerStatus();
            const fee = new Amount(payment.calculateFee(BaseFee)).dropsToXrp();
            setFee(fee);

            // move to summary step
            goNext();
        } catch (e) {
            this.setState({ isLoading: false });
            Toast(Localize.t('send.unableToSetFeesPleaseTryAgain'));
        }
    };

    goBack = () => {
        const { goBack } = this.context;

        this.clearDestination();

        goBack();
    };

    renderSectionHeader = ({ section: { title } }: any) => {
        const { dataSource } = this.state;

        if (title === Localize.t('send.searchResults')) {
            return (
                <View style={[styles.sectionHeader, AppStyles.row]}>
                    <View style={[AppStyles.flex1, AppStyles.centerContent]}>
                        <Text style={[AppStyles.p, AppStyles.bold]}>
                            {title} {dataSource[0].data?.length > 0 && `(${dataSource[0].data?.length})`}
                        </Text>
                    </View>
                    <View style={[AppStyles.flex1]}>
                        <Button
                            onPress={this.resetResult}
                            style={styles.clearSearchButton}
                            light
                            label={Localize.t('global.clearSearch')}
                        />
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.sectionHeader}>
                <Text style={[AppStyles.p, AppStyles.bold]}>{title}</Text>
            </View>
        );
    };

    renderItem = (row: any) => {
        const { destination, setDestination } = this.context;
        const { item } = row;

        if (item.empty) {
            return <InfoMessage type="warning" label={item.title} />;
        }

        const selected = item.address === get(destination, 'address') && item.name === get(destination, 'name');

        return (
            <RecipientElement
                recipient={item}
                selected={selected}
                showTag={false}
                showSource
                onPress={() => {
                    if (!selected) {
                        setDestination({
                            name: item.name,
                            address: item.address,
                            tag: item.tag,
                        });
                    } else {
                        setDestination(undefined);
                    }
                }}
            />
        );
    };

    renderListEmptyComponent = () => {
        const { setDestination } = this.context;

        return (
            <>
                <View style={[styles.sectionHeader, AppStyles.row]}>
                    <View style={[AppStyles.flex1, AppStyles.centerContent]}>
                        <Text style={[AppStyles.p, AppStyles.bold]}>{Localize.t('send.searchResults')}</Text>
                    </View>
                    <View style={[AppStyles.flex1]}>
                        <Button
                            onPress={() => {
                                // clear search text
                                this.setState({
                                    searchText: '',
                                });
                                // clear the destination if any set
                                setDestination(undefined);
                                // set the default source
                                this.setDefaultDataSource();
                            }}
                            style={styles.clearSearchButton}
                            light
                            roundedSmall
                            label={Localize.t('global.clearSearch')}
                        />
                    </View>
                </View>
                <View style={AppStyles.paddingVerticalSml}>
                    <InfoMessage type="warning" label={Localize.t('send.noSearchResult')} />
                </View>
            </>
        );
    };

    render() {
        const { destination } = this.context;
        const { searchText, isSearching, isLoading, dataSource } = this.state;

        if (!dataSource) return null;

        return (
            <View testID="send-recipient-view" style={[AppStyles.container]}>
                <View style={[AppStyles.contentContainer, AppStyles.paddingHorizontal]}>
                    <View style={[AppStyles.row]}>
                        <TextInput
                            placeholder={Localize.t('send.enterANameOrAddress')}
                            // containerStyle={styles.searchContainer}
                            inputStyle={styles.inputText}
                            containerStyle={styles.inputContainer}
                            onChangeText={this.onSearch}
                            value={searchText}
                            showScanner
                            scannerType={StringType.XrplDestination}
                            onScannerRead={this.onScannerRead}
                            scannerFallback
                        />
                    </View>

                    <View style={[AppStyles.flex8, AppStyles.paddingTopSml]}>
                        <SectionList
                            ListEmptyComponent={this.renderListEmptyComponent}
                            extraData={searchText}
                            sections={dataSource}
                            renderItem={this.renderItem}
                            renderSectionHeader={this.renderSectionHeader}
                            keyExtractor={(item) => `${item.address}${item.tag}`}
                            refreshControl={
                                <RefreshControl refreshing={isSearching} tintColor={StyleService.value('$contrast')} />
                            }
                            indicatorStyle={StyleService.isDarkMode() ? 'white' : 'default'}
                        />
                    </View>
                </View>

                {/* Bottom Bar */}
                <Footer style={[AppStyles.row]} safeArea>
                    <View style={[AppStyles.flex1, AppStyles.paddingRightSml]}>
                        <Button light label={Localize.t('global.back')} onPress={this.goBack} />
                    </View>
                    <View style={[AppStyles.flex2]}>
                        <Button
                            isLoading={isLoading}
                            textStyle={AppStyles.strong}
                            isDisabled={!destination}
                            label={Localize.t('global.next')}
                            onPress={this.checkAndNext}
                        />
                    </View>
                </Footer>
            </View>
        );
    }
}

/* Export Component ==================================================================== */
export default RecipientStep;
