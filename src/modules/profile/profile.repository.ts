import { Transaction } from "sequelize";
import Job from "../../models/job.model";
import Profile from "../../models/profile.model";

export class ProfileRepository {
    
    public async getProfileById(profile_id: number) {
        return await Profile.findOne({where: {id: profile_id}});
    }

    public async getBestProfession(start: moment.Moment, end: moment.Moment) {
        try {
            // I'm really sorry I failed to finish the task in time
            // Changing from javascript to typescript took me more time than I thought
            // So I made this query without using Sequelize to go faster, if I had more time I would've made it fully with Sequelize ORM.
            const [results, metadata] = await global.sequelize.query(`\
                SELECT sum(Jobs.price) as total, Profiles.profession  as profileId FROM Profiles \
                INNER JOIN Contracts ON Profiles.id = Contracts.ContractorId \
                INNER JOIN Jobs ON Contracts.id = Jobs.ContractId \
                WHERE \ 
                Jobs.paymentDate >= '${start.format('YYYY-MM-DD')}' AND \
                Jobs.paymentDate <= '${end.format('YYYY-MM-DD')}' AND \
                Jobs.paid = true \
                GROUP BY profileId \
                ORDER BY total DESC \
                LIMIT 1; \
            `);
            return results;
        } catch (error) {
            return [];
        }
    }

    public async getBestClients(start: moment.Moment, end: moment.Moment, limit: number) {
        try {
            const [results, metadata] = await global.sequelize.query(`\
                SELECT sum(Jobs.price) as paid, Profiles.firstName || ' ' || Profiles.lastName as fullName FROM Profiles \
                INNER JOIN Contracts ON Profiles.id = Contracts.ContractorId \
                INNER JOIN Jobs ON Contracts.id = Jobs.ContractId \
                WHERE \ 
                Jobs.paymentDate >= '${start.format('YYYY-MM-DD')}' AND \
                Jobs.paymentDate <= '${end.format('YYYY-MM-DD')}' AND \
                Jobs.paid = true \
                GROUP BY fullName \
                ORDER BY paid DESC \
                LIMIT ${limit}; \
            `);
            return results;
        } catch (error) {
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