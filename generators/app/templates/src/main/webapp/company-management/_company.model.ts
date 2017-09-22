import { BaseEntity, User } from './../../shared';

export class <%= tenantNameUpperFirst %> implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public users?: User[],
    ) {
    }
}
