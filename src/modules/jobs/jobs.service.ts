import { inject, injectable } from "tsyringe";
import Job from "../../models/job.model";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { IProfileService } from "../profile/profile.interface";
import { IJobsRepository, IJobsService } from "./jobs.interface";

@injectable()
export class JobService implements IJobsService {
    constructor(
        @inject('IJobsRepository') private readonly jobRepository: IJobsRepository, 
        @inject('IProfileService') private readonly profileService: IProfileService) {
    }

    public async getJobById(job_id: number): Promise<Job> {
        return await this.jobRepository.getJobById(job_id);
    }

    public async getUnpaidJobsOfProfile(profile_id: number, job_id: number = null): Promise<Job[]>{
        return await this.jobRepository.getUnpaidJobsOfProfile(profile_id, job_id);
    }

    public async payJobById(profile: Profile, job_id: number): Promise<ResponseManagement>{
        try {
            const jobs: Job[] = await this.getUnpaidJobsOfProfile(profile.id, job_id);
            if (!jobs || jobs.length !== 1) {
                return {success: false, message: `Job ${job_id} does not exist`, statusCode: 404};
            }
            if (profile.balance >= jobs[0].price) {
                const receiver: Profile = await this.profileService.getProfileById(jobs[0].contract.ContractorId);
                const paymentStatus: boolean = await this.profileService.pay(profile, receiver, jobs[0]);
                if (paymentStatus) {
                    return {success: true, message: `Successfully paid job ${job_id}`, statusCode: 200};
                }
                return {success: false, message: `Could not pay job ${job_id} in the database`, statusCode: 500};
            }
            return {success: false, message: `Not enough balance to pay job ${job_id}`, statusCode: 200};
        } catch (error: any) {
            console.error(error);
            return {success: false, message: `Failed to pay job ${job_id}`, statusCode: 500};
        }
    }

    public async checkIfAmountBelowRequirement(payor: Profile, amount: number): Promise<boolean> {
        return await this.jobRepository.getMaximumDepositAmount(payor) <= amount;
    }
}