import Realm from 'realm';
import { has } from 'lodash';

import { NetworkModel } from '@store/models';

import BaseRepository from './base';

/* Repository  ==================================================================== */
class NetworkRepository extends BaseRepository<NetworkModel> {
    initialize(realm: Realm) {
        this.realm = realm;
        this.model = NetworkModel;
    }

    add = (network: Partial<NetworkModel>) => {
        // check if network is already exist
        const exist = !this.query({ id: network.id }).isEmpty();

        // if not exist add it to the store
        if (!exist) {
            return this.create(network);
        }

        return undefined;
    };

    getNetworks = (filters?: Partial<NetworkModel>) => {
        if (filters) {
            return this.query(filters);
        }
        return this.findAll();
    };

    update = (object: Partial<NetworkModel>) => {
        // the primary key should be in the object
        if (!has(object, this.model.schema.primaryKey)) {
            throw new Error('Update require primary key to be set');
        }
        return this.create(object, true);
    };

    exist = (networkId: number): boolean => {
        return !this.query({ id: networkId }).isEmpty();
    };
}

export default new NetworkRepository();
