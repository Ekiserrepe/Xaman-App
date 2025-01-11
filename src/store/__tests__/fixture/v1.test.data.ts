import { AccessLevels, EncryptionLevels, BiometryType } from '@store/types';

import { schemas } from '../../models/schemas/v1';

export default {
    [schemas.CounterPartySchema.schema.name]: {
        id: 1337,
        name: 'Counter Party Name',
        avatar: 'https://cdn.image.com',
        domain: 'https://somedomain.com',
        currencies: [
            {
                id: '123',
                issuer: 'rISSUERxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                currency: 'EUR',
                name: 'euro',
                avatar: 'https://cdn.image.com',
            },
        ],
        registerAt: new Date(),
        updatedAt: new Date(),
    },

    [schemas.CurrencySchema.schema.name]: {
        id: 'ORPHAN.ORP',
        issuer: 'ORPHAN',
        currency: 'ORP',
        name: 'Orphaned currency',
        avatar: 'https://cdn.image.com',
    },
    [schemas.AccountSchema.schema.name]: {
        address: 'rADDRESSxxxxxxxxxxxxxxxxxxxxxxxxxx',
        label: 'Personal account',
        balance: 0,
        ownerCount: 0,
        sequence: 0,
        publicKey: 'PUBLICKEYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        regularKey: 'rREGULARKEYxxxxxxxxxxxxxxxxxxxxxxxxxx',
        accessLevel: AccessLevels.Full,
        encryptionLevel: EncryptionLevels.Passcode,
        flagsString: JSON.stringify({
            defaultRipple: false,
            depositAuth: false,
            disableMasterKey: false,
            disallowIncomingCheck: false,
            disallowIncomingNFTokenOffer: false,
            disallowIncomingPayChan: false,
            disallowIncomingTrustline: false,
            disallowIncomingXRP: false,
            globalFreeze: false,
            noFreeze: false,
            passwordSpent: false,
            requireAuthorization: false,
            requireDestinationTag: false,
        }),
        default: true,
        lines: [
            {
                currency: {
                    id: '123',
                    issuer: 'rISSUERxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    currency: 'EUR',
                    name: 'euro',
                    avatar: 'https://cdn.image.com',
                },
                balance: 0,
                transfer_rate: 0,
                no_ripple: false,
                no_ripple_peer: false,
                limit: 0,
                quality_in: 0,
                quality_out: 0,
            },
        ],
        registerAt: new Date(),
        updatedAt: new Date(),
    },

    [schemas.ProfileSchema.schema.name]: {
        username: 'my username',
        slug: 'my slug',
        uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        signedTOSVersion: 1,
        signedTOSDate: new Date(),
        accessToken: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        idempotency: 0,
        registerAt: new Date(),
        lastSync: new Date(),
    },

    [schemas.ContactSchema.schema.name]: {
        id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        address: 'rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        name: 'some contact',
        destinationTag: '1337',
        registerAt: new Date(),
        updatedAt: new Date(),
    },

    [schemas.CoreSchema.schema.name]: {
        initialized: true,
        passcode: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        minutesAutoLock: 1,
        timePassLocked: 0,
        passcodeAttempts: 0,
        lastUnlocked: 0,
        biometricMethod: BiometryType.FaceID,
        passcodeFallback: false,
        language: 'en',
        defaultNode: 'wss://s.altnet.rippletest.net:51233',
        showMemoAlert: true,
    },
};
