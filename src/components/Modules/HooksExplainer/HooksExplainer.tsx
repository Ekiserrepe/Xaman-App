import { get } from 'lodash';

import React, { Component } from 'react';

import { WebLinks } from '@common/constants/endpoints';

import { Payload } from '@common/libs/payload';

import NetworkService from '@services/NetworkService';
import StyleService from '@services/StyleService';

import { Transactions as TransactionsType, FallbackTransaction } from '@common/libs/ledger/transactions/types';

import { WebViewBrowser } from '@components/General/WebView';

import { AccountModel } from '@store/models';

import Localize from '@locale';

import { AppSizes } from '@theme';
/* Types ==================================================================== */
interface Props {
    account: AccountModel;
    payload?: Payload;
    transaction?: TransactionsType | FallbackTransaction;
}

interface State {
    containerHeight: number;
}

/* Component ==================================================================== */
class HooksExplainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            containerHeight: AppSizes.scale(150),
        };
    }

    getSource = () => {
        const { account, payload, transaction } = this.props;

        const params = {
            network: NetworkService.getNetwork().key,
            style: StyleService.getCurrentTheme(),
        };

        if (payload) {
            Object.assign(params, {
                payload_uuid: payload.getPayloadUUID(),
            });
        }

        // The size of tx_data by a sample transaction using different methods
        // LOG  Hex.Encode     1792
        // LOG  JSON.stringify 896
        // LOG  codec.encode   646
        if (transaction) {
            Object.assign(params, {
                tx_hash: transaction.hash,
                tx_data: JSON.stringify(transaction.JsonForSigning),
                tx_metadata: JSON.stringify(transaction.MetaData),
            });
        }

        if (account) {
            Object.assign(params, {
                account: account.address,
            });
        }

        return {
            uri: `${WebLinks.HooksExplainerURL}/${Localize.getCurrentLocale()}`,
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'User-Agent': 'Xaman',
                'Content-Type': 'application/json',
            },
        };
    };

    onMessage = (event: any) => {
        try {
            // get passed data
            const data = get(event, 'nativeEvent.data');

            const parsedData = JSON.parse(data);

            const layoutHeight = get(parsedData, 'layout.height');

            if (typeof layoutHeight === 'number') {
                this.setState({
                    containerHeight: layoutHeight,
                });
            }
        } catch {
            // something is not right, just ignore ?
        }
    };

    render() {
        const { containerHeight } = this.state;

        return (
            <WebViewBrowser
                source={this.getSource()}
                onMessage={this.onMessage}
                style={{ height: containerHeight }}
                errorMessage={Localize.t('events.unableToLoadExplainer')}
            />
        );
    }
}

export default HooksExplainer;
