/* eslint-disable max-len */

import Localize from '@locale';

import { MutationsMixin } from '@common/libs/ledger/mixin';

import { URITokenBurn, URITokenBurnInfo } from '../URITokenBurn';
import uriTokenBurnTemplate from './fixtures/URITokenBurnTx.json';
import { AssetTypes } from '../../../factory/types';

jest.mock('@services/NetworkService');

describe('URITokenBurn tx', () => {
    describe('Class', () => {
        it('Should set tx type if not set', () => {
            const instance = new URITokenBurn();
            expect(instance.TransactionType).toBe('URITokenBurn');
            expect(instance.Type).toBe('URITokenBurn');
        });
    });

    describe('Info', () => {
        const { tx, meta }: any = uriTokenBurnTemplate;
        const Mixed = MutationsMixin(URITokenBurn);
        const instance = new Mixed(tx, meta);
        const info = new URITokenBurnInfo(instance, {} as any);

        describe('generateDescription()', () => {
            it('should return the expected description', () => {
                const expectedDescription =
                    'The transaction will burn URI token with ID C84F707D006E99BEA1BC0A05C9123C8FFE3B40C45625C20DA24059DE09C09C9F';
                expect(info.generateDescription()).toEqual(expectedDescription);
            });
        });

        describe('getEventsLabel()', () => {
            it('should return the expected label', () => {
                expect(info.getEventsLabel()).toEqual(Localize.t('events.burnURIToken'));
            });
        });

        describe('getParticipants()', () => {
            it('should return the expected participants', () => {
                expect(info.getParticipants()).toStrictEqual({
                    start: { address: 'rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn', tag: undefined },
                });
            });
        });

        describe('getMonetaryDetails()', () => {
            it('should return the expected monetary details', () => {
                expect(info.getMonetaryDetails()).toStrictEqual({
                    mutate: {
                        DEC: [],
                        INC: [],
                    },
                    factor: undefined,
                });
            });
        });

        describe('getAssetDetails()', () => {
            it('should return the expected asset details', () => {
                expect(info.getAssetDetails()).toStrictEqual([
                    {
                        owner: 'rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn',
                        type: AssetTypes.URIToken,
                        uriTokenId: 'C84F707D006E99BEA1BC0A05C9123C8FFE3B40C45625C20DA24059DE09C09C9F',
                    },
                ]);
            });
        });
    });

    describe('Validation', () => {});
});
