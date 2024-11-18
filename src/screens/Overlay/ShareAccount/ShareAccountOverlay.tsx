/**
 * Switch Account Overlay
 */
import React, { Component } from 'react';
import { View, Text, Share } from 'react-native';

import { AppScreens } from '@common/constants';

import { Toast } from '@common/helpers/interface';
import { Navigator } from '@common/helpers/navigator';
import { Clipboard } from '@common/helpers/clipboard';

import { AccountModel } from '@store/models';

import { ActionPanel, Button, QRCode, Footer } from '@components/General';

import Localize from '@locale';

import { RequestViewProps } from '@screens/Request';

import { AppStyles, AppSizes } from '@theme';
import styles from './styles';

/* types ==================================================================== */
export interface Props {
    account: AccountModel;
}

export interface State {}

/* Component ==================================================================== */
class ShareAccountOverlay extends Component<Props, State> {
    static screenName = AppScreens.Overlay.ShareAccount;

    private actionPanelRef: React.RefObject<ActionPanel>;

    static options() {
        return {
            statusBar: {
                visible: true,
                style: 'light',
            },
            topBar: {
                visible: false,
            },
        };
    }

    constructor(props: Props) {
        super(props);

        this.actionPanelRef = React.createRef();
    }

    onSharePress = () => {
        const { account } = this.props;

        this.actionPanelRef?.current?.slideDown();

        setTimeout(() => {
            Share.share({
                title: Localize.t('home.shareAccount'),
                message: account.address,
                url: undefined,
            }).catch(() => {});
        }, 1000);
    };

    onCopyAddressPress = () => {
        const { account } = this.props;

        this.actionPanelRef?.current?.slideDown();

        Clipboard.setString(account.address);

        setTimeout(() => {
            Toast(Localize.t('account.publicKeyCopiedToClipboard'));
        }, 1000);
    };

    onPaymentRequestPress = () => {
        this.actionPanelRef?.current?.slideDown();

        setTimeout(() => {
            Navigator.push<RequestViewProps>(AppScreens.Transaction.Request, {});
        }, 1000);
    };

    onClosePress = () => {
        this.actionPanelRef?.current?.slideDown();
    };

    render() {
        const { account } = this.props;

        return (
            <ActionPanel
                ref={this.actionPanelRef}
                height={AppSizes.moderateScale(570)}
                onSlideDown={Navigator.dismissOverlay}
                contentStyle={AppStyles.centerAligned}
                extraBottomInset
            >
                <View style={[AppStyles.row, AppStyles.centerAligned, AppStyles.paddingBottomSml]}>
                    <View style={[AppStyles.flex1, AppStyles.paddingLeftSml]}>
                        <Text numberOfLines={1} style={[AppStyles.h5, AppStyles.strong]}>
                            {Localize.t('send.myAccount')}
                        </Text>
                    </View>
                    <View style={[AppStyles.row, AppStyles.flex1, AppStyles.paddingRightSml, AppStyles.flexEnd]}>
                        <Button
                            light
                            roundedSmall
                            isDisabled={false}
                            onPress={this.onClosePress}
                            textStyle={[AppStyles.subtext, AppStyles.bold]}
                            label={Localize.t('global.close')}
                        />
                    </View>
                </View>

                <View style={styles.qrCodeContainer}>
                    <View style={styles.qrCode}>
                        <QRCode size={AppSizes.moderateScale(150)} value={`${account.address}`} />
                    </View>
                </View>

                <View style={[AppStyles.paddingBottom, AppStyles.paddingHorizontalSml]}>
                    <Text style={[AppStyles.pbold, AppStyles.textCenterAligned]}>{Localize.t('global.address')}:</Text>
                    <View style={styles.addressTextContainer}>
                        <Text selectable adjustsFontSizeToFit numberOfLines={1} style={styles.addressText}>
                            {account.address}
                        </Text>
                    </View>
                </View>

                <View style={[AppStyles.row, AppStyles.centerContent, AppStyles.paddingHorizontalSml]}>
                    <Button
                        light
                        rounded
                        numberOfLines={1}
                        icon="IconShare"
                        iconStyle={AppStyles.imgColorBlue}
                        label={Localize.t('global.share')}
                        onPress={this.onSharePress}
                        style={[AppStyles.flex1, AppStyles.marginRight]}
                    />
                    <Button
                        light
                        rounded
                        numberOfLines={1}
                        icon="IconClipboard"
                        iconStyle={AppStyles.imgColorBlue}
                        label={Localize.t('global.copy')}
                        onPress={this.onCopyAddressPress}
                        style={[AppStyles.flex1]}
                    />
                </View>

                <Footer style={styles.footer}>
                    <Button
                        numberOfLines={1}
                        label={Localize.t('global.createPaymentRequestLink')}
                        onPress={this.onPaymentRequestPress}
                        style={AppStyles.buttonGreen}
                    />
                </Footer>
            </ActionPanel>
        );
    }
}

/* Export Component ==================================================================== */
export default ShareAccountOverlay;
