export interface IEnt {
    id?: number;
    name?: string;
}

export class Ent implements IEnt {
    constructor(public id?: number, public name?: string) {}
}
