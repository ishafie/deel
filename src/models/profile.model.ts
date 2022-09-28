import { AllowNull, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Contract from "./contract.model";

enum ProfileEnum {
    client,
    contractor
}

@Table
export default class Profile extends Model {

    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @Column
    profession: string;

    @Column
    balance: number;

    @Column
    type: ProfileEnum;

    @HasMany(() => Contract, 'ContractorId')
    contractorContracts: Contract[]

    @HasMany(() => Contract, 'ClientId')
    clientContracts: Contract[]
}