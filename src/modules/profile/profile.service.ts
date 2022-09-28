import Job from "../../models/job.model";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { JobService } from "../jobs/job.service";
import { ProfileRepository } from "./profile.repository";
import * as moment from 'moment';

export class ProfileService {
    private profileRepository: ProfileRepository;

    constructor() {
        this.profileRepository = new ProfileRepository();
    }

    public async getProfileById(profile_id: number) {
        return await this.profileRepository.getProfileById(profile_id);
    }

    public async pay(payor: Profile, receiver: Profile, job: Job) {
        return await this.profileRepository.payBetweenUsers(payor, receiver, job);
    }

    public async deposit(payor: Profile, receiver: Profile, amount: number, jobService: JobService): Promise<ResponseManagement> {
        try {
            const isBelowRequirement = await jobService.checkIfAmountBelowRequirement(payor, amount);
            if (isBelowRequirement) {
                const paymentStatus = await this.profileRepository.payBetweenUsersSpecificAmount(payor, receiver, amount);
                return {success: true, statusCode: 200, message: `You successfully deposited ${amount}$ to ${receiver.firstName} ${receiver.lastName}`};
            }
            return {success: false, message: `Your deposit can't be more than 25% the total of jobs to pay.`, statusCode: 200}
        }
        catch (error: any) {
            console.log(error);
            return {success: false, statusCode: 500, message: `Failed to pay deposit`};
        }        
    }

    public async getBestProfession(start: moment.Moment, end: moment.Moment) {
       return await this.profileRepository.getBestProfession(start, end);
    }

    public async getBestClients(start: moment.Moment, end: moment.Moment, limit: number) {
        return await this.profileRepository.getBestClients(start, end, limit);
     }
}