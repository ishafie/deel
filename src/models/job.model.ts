import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import Contract from "./contract.model";

@Table
export default class Job extends Model {
    
    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(false)
    @Column
    price: number;

    @Default(false)
    @Column
    paid: boolean;

    @Column(DataType.DATE)
    paymentDate: Date;

    @ForeignKey(() => Contract)
    @Column
    ContractId: number;

    @BelongsTo(() => Contract)
    contract: Contract;
}