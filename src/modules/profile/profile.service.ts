import Job from "../../models/job.model";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { JobService } from "../jobs/jobs.service";
import * as moment from 'moment';
import { injectable } from "tsyringe";
import { ProfileRepository } from "./profile.repository";
import { IProfileService } from "./profile.interface";

@injectable()
export class ProfileService implements IProfileService {

    constructor(private readonly profileRepository: ProfileRepository, private readonly jobService: JobService) {
    }

    public async getProfileById(profile_id: number) {
        return await this.profileRepository.getProfileById(profile_id);
    }

    public async pay(payor: Profile, receiver: Profile, job: Job): Promise<boolean> {
        const result = await this.profileRepository.payBetweenUsers(payor, receiver, job);
        return result.find((r) => r[0] !== 1) === undefined;
    }

    public async deposit(payor: Profile, receiver: Profile, amount: number): Promise<ResponseManagement> {
        try {
            const isBelowRequirement = await this.jobService.checkIfAmountBelowRequirement(payor, amount);
            if (isBelowRequirement) {
                const paymentResult = await this.profileRepository.payBetweenUsersSpecificAmount(payor, receiver, amount);
                const paymentStatus = paymentResult.find((r) => r[0] !== 1) === undefined;
                if (paymentStatus) {
                    return {success: true, statusCode: 200, message: `You successfully deposited ${amount}$ to ${receiver.firstName} ${receiver.lastName}`};
                }
                return {success: false, statusCode: 500, message: `Error occured in the database while trying to pay`};
            }
            return {success: false, message: `Your deposit can't be more than 25% the total of jobs to pay.`, statusCode: 200}
        }
        catch (error: any) {
            console.error(error);
            return {success: false, statusCode: 500, message: `Failed to pay deposit`};
        }        
    }

    public async getBestProfession(start: moment.Moment, end: moment.Moment): Promise<Profile> {
        try {
            return await this.profileRepository.getBestProfession(start, end);
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    }

    public async getBestClients(start: moment.Moment, end: moment.Moment, limit: number) {
        try {
            return await this.profileRepository.getBestClients(start, end, limit);
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    }
}