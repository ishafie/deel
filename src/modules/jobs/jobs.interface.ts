import Job from "../../models/job.model";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";

export interface IJobsRepository {
    getJobById(job_id: number);
    getUnpaidJobsOfProfile(profile_id: number, job_id?: number);
    getMaximumDepositAmount(payor: Profile);
}

export interface IJobsService {
    getJobById(job_id: number): Promise<Job>;
    getUnpaidJobsOfProfile(profile_id: number, job_id?: number): Promise<Job[]>;
    payJobById(profile: Profile, job_id: number): Promise<ResponseManagement>;
    checkIfAmountBelowRequirement(payor: Profile, amount: number): Promise<boolean>;
}