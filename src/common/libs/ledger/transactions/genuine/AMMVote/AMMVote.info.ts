import Localize from '@locale';

import { AccountModel } from '@store/models';

import AMMVote from './AMMVote.class';

/* Types ==================================================================== */
import { MutationsMixinType } from '@common/libs/ledger/mixin/types';
import { ExplainerAbstract } from '@common/libs/ledger/factory/types';

/* Descriptor ==================================================================== */
class AMMVoteInfo extends ExplainerAbstract<AMMVote, MutationsMixinType> {
    constructor(item: AMMVote & MutationsMixinType, account: AccountModel) {
        super(item, account);
    }

    getEventsLabel(): string {
        return Localize.t('events.ammVote');
    }

    generateDescription(): string {
        return `This is an ${this.item.Type} transaction`;
    }

    getParticipants() {
        return {
            start: { address: this.item.Account, tag: this.item.SourceTag },
        };
    }

    getMonetaryDetails() {
        // TODO: add factor
        return {
            mutate: this.item.BalanceChange(this.account.address),
            factor: undefined,
        };
    }
}

/* Export ==================================================================== */
export default AMMVoteInfo;
