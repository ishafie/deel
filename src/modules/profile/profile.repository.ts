import { Op, Transaction } from "sequelize";
import { injectable } from "tsyringe";
import Contract from "../../models/contract.model";
import Job from "../../models/job.model";
import Profile from "../../models/profile.model";
import { IProfileRepository } from "./profile.interface";

@injectable()
export class ProfileRepository implements IProfileRepository {
    
    public async getProfileById(profile_id: number) {
        return await Profile.findOne({where: {id: profile_id}});
    }

    public async getBestProfession(start: moment.Moment, end: moment.Moment) {
        try {
            return (await Profile.findAll({
                attributes: ['profession', [global.sequelize.fn('sum', global.sequelize.col('price')), 'paid']],
                group: ['profession'],
                order: [['paid', 'DESC']],
                include: [{
                    model: Contract,
                    as: 'contractorContracts',
                    attributes: [],
                    required: true,
                    include: [{
                        model: Job,
                        attributes: [],
                        where: {
                            paymentDate: {
                                [Op.between]: [start.format('YYYY-MM-DD') + ' 00:00:00', end.format('YYYY-MM-DD') + ' 23:59:59']
                            },
                            paid: true
                        }
                    }],
                }],
            })).shift();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getBestClients(start: moment.Moment, end: moment.Moment, limit: number) {
        try {
            return (await Profile.findAll({
                attributes: [['id', 'profileId'], [global.sequelize.literal("firstName || ' ' || lastName"), 'fullName'], [global.sequelize.fn('sum', global.sequelize.col('price')), 'paid']],
                group: ['profileId', 'fullName'],
                order: [['paid', 'DESC']],
                include: [{
                    model: Contract,
                    as: 'clientContracts',
                    attributes: [],
                    required: true,
                    include: [{
                        model: Job,
                        attributes: [],
                        where: {
                            paymentDate: {
                                [Op.between]: [start.format('YYYY-MM-DD') + ' 00:00:00', end.format('YYYY-MM-DD') + ' 23:59:59']
                            },
                            paid: true
                        }
                    }],
                }],
            })).splice(0, limit);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async payBetweenUsers(payor: Profile, receiver: Profile, job: Job) {
        try {
            const result = await global.sequelize.transaction(async (t: Transaction) => {
                await Promise.all([
                    Job.update(
                        {
                            paid: true
                        },
                        {
                            where: {id : job.id}
                        }
                    ),
                    Profile.update(
                        {
                            balance: receiver.balance + job.price
                        },
                        {
                            where: { id: receiver.id }
                        }
                    ),
                    Profile.update(
                        {
                            balance: payor.balance - job.price
                        },
                        {
                            where: { id: payor.id }
                        }
                    )
                ]);
            });
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    public async payBetweenUsersSpecificAmount(payor: Profile, receiver: Profile, price: number) {
        try {
            const result = await global.sequelize.transaction(async (t: Transaction) => {
                await Promise.all([
                    Profile.update(
                        {
                            balance: receiver.balance + price
                        },
                        {
                            where: { id: receiver.id }
                        }
                    ),
                    Profile.update(
                        {
                            balance: payor.balance - price
                        },
                        {
                            where: { id: payor.id }
                        }
                    )
                ]);
            });
            return result;
        } catch (error: any) {
            throw error;
        }
    }
    

}