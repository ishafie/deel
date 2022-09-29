import { injectable } from "tsyringe";
import Job from "../../models/job.model";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { ProfileService } from "../profile/profile.service";
import { JobRepository } from "./jobs.repository";

@injectable()
export class JobService {
    constructor(private readonly jobRepository: JobRepository) {
    }

    public async getJobById(job_id: number): Promise<Job> {
        return await this.jobRepository.getJobById(job_id);
    }

    public async getUnpaidJobsOfProfile(profile_id: number, job_id: number = null): Promise<Job[]>{
        return await this.jobRepository.getUnpaidJobsOfProfile(profile_id, job_id);
    }

    public async payJobById(profile: Profile, job_id: number, profileService: ProfileService): Promise<ResponseManagement>{
        try {
            const jobs: Job[] = await this.getUnpaidJobsOfProfile(profile.id, job_id);
            if (!jobs || jobs.length !== 1) {
                return {success: false, message: `Job ${job_id} does not exist`, statusCode: 404};
            }
            if (profile.balance >= jobs[0].price) {
                const receiver: Profile = await profileService.getProfileById(jobs[0].contract.ContractorId);
                const paymentStatus = await profileService.pay(profile, receiver, jobs[0]);
                return {success: true, message: `Successfully paid job ${job_id}`, statusCode: 200};
            }
            return {success: false, message: `Not enough balance to pay job ${job_id}`, statusCode: 200};
        } catch (error: any) {
            return {success: false, message: `Failed to pay job ${job_id}`, statusCode: 500};
        }
    }

    public async checkIfAmountBelowRequirement(payor: Profile, amount: number): Promise<boolean> {
        return await this.jobRepository.getMaximumDepositAmount(payor) <= amount;
    }
}