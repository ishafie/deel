import { Op, WhereOptions } from "sequelize";
import { injectable } from "tsyringe";
import Contract, { ContractEnum } from "../../models/contract.model";
import Job from "../../models/job.model";
import Profile from "../../models/profile.model";
@injectable()
export class JobRepository {
    
    public async getJobById(job_id: number) {
        return await Job.findOne({where: {id: job_id}});
    }

    public async getUnpaidJobsOfProfile(profile_id: number, job_id: number = null) {
        let whereOptions: WhereOptions = {
            paid: false
        };
        if (job_id) {
            whereOptions.id = job_id;
        }
        return await Job.findAll({
            where: whereOptions,
            include: [{
                model: Contract,
                attributes: ['ContractorId', 'ClientId'],
                where: {
                    [Op.or]: [
                        {ContractorId: profile_id},
                        {ClientId: profile_id}
                    ],
                    status: ContractEnum.IN_PROGRESS
                }
            }]
        });
    }

    public async getMaximumDepositAmount(payor: Profile) {
        return (await Job.findAll({
            where: {
                paid: false
            },
            include: [{
                model: Contract,
                attributes: ['ContractorId'],
                where: {
                    ContractorId: payor.id,
                    status: ContractEnum.IN_PROGRESS
                }
            }]
        })).map((job) => ({price: job.price})).reduce((a, b) => ({price: a.price + b.price}), {price: 0}).price * 0.25;
    }

    
}