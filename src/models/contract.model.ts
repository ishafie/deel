import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Job from "./job.model";
import Profile from "./profile.model";

export enum ContractEnum {
    NEW='new',
    IN_PROGRESS='in_progress',
    TERMINATED='terminated'
}

@Table
export default class Contract extends Model {
    @AllowNull(false)
    @Column(DataType.TEXT)
    terms: string;

    @Column(DataType.ENUM('new', 'in_progress', 'terminated'))
    status: string;

    @ForeignKey(() => Profile)
    @Column
    ClientId: number;

    @ForeignKey(() => Profile)
    @Column
    ContractorId: number;

    @BelongsTo(() => Profile)
    Contractor: Profile;

    @BelongsTo(() => Profile)
    Client: Profile;

    @HasMany(() => Job)
    jobs: Job[]
}