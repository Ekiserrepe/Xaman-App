import moment from 'moment-timezone';
import Localize from '@locale';

import { AccountModel } from '@store/models';

import { NormalizeCurrencyCode } from '@common/utils/monetary';

import NFTokenOffer from '@common/libs/ledger/objects/NFTokenOffer/NFTokenOffer.class';

/* Types ==================================================================== */
import { AssetDetails, AssetTypes, ExplainerAbstract, MonetaryStatus } from '@common/libs/ledger/factory/types';
import { OperationActions } from '@common/libs/ledger/parser/types';

/* Descriptor ==================================================================== */
class NFTokenOfferInfo extends ExplainerAbstract<NFTokenOffer> {
    constructor(item: NFTokenOffer, account: AccountModel) {
        super(item, account);
    }

    getEventsLabel(): string {
        // incoming offers
        if (this.item.Owner !== this.account.address) {
            if (this.item.Flags?.lsfSellNFToken) {
                return Localize.t('events.nftOfferedToYou');
            }
            return Localize.t('events.offerOnYouNFT');
        }
        // outgoing offers
        if (this.item.Flags?.lsfSellNFToken) {
            return Localize.t('events.sellNFToken');
        }
        return Localize.t('events.buyNFToken');
    }

    generateDescription(): string {
        const content: string[] = [];

        if (this.item.Flags?.lsfSellNFToken) {
            content.push(
                Localize.t('events.nftOfferSellExplain', {
                    address: this.item.Owner,
                    tokenID: this.item.NFTokenID,
                    amount: this.item.Amount!.value,
                    currency: NormalizeCurrencyCode(this.item.Amount!.currency),
                }),
            );
        } else {
            content.push(
                Localize.t('events.nftOfferBuyExplain', {
                    address: this.item.Owner,
                    tokenID: this.item.NFTokenID,
                    amount: this.item.Amount!.value,
                    currency: NormalizeCurrencyCode(this.item.Amount!.currency),
                }),
            );
        }

        if (typeof this.item.Owner !== 'undefined') {
            content.push(Localize.t('events.theNftOwnerIs', { address: this.item.Owner }));
        }

        if (typeof this.item.Destination !== 'undefined') {
            content.push(Localize.t('events.thisNftOfferMayOnlyBeAcceptedBy', { address: this.item.Destination }));
        }

        if (typeof this.item.Expiration !== 'undefined') {
            content.push(
                Localize.t('events.theOfferExpiresAtUnlessCanceledOrAccepted', {
                    expiration: moment(this.item.Expiration).format('LLLL'),
                }),
            );
        }

        return content.join('\n');
    }

    getParticipants() {
        return {
            start: { address: this.item.Owner, tag: undefined },
            send: { address: this.item.Destination, tag: undefined },
        };
    }

    getMonetaryDetails() {
        let action = OperationActions.DEC;

        // incoming offer for your NFT
        if (this.item.Owner !== this.account.address) {
            action = OperationActions.INC;
        } else if (this.item.Flags?.lsfSellNFToken) {
            action = OperationActions.INC;
        }

        return {
            mutate: {
                [OperationActions.INC]: [],
                [OperationActions.DEC]: [],
            },
            factor: [
                {
                    ...this.item.Amount!,
                    effect: MonetaryStatus.POTENTIAL_EFFECT,
                    action,
                },
            ],
        };
    }

    getAssetDetails(): AssetDetails[] {
        return [{ type: AssetTypes.NFToken, nfTokenId: this.item.NFTokenID! }];
    }
}

/* Export ==================================================================== */
export default NFTokenOfferInfo;
