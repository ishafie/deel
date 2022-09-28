import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { JobService } from "../jobs/job.service";
import { ProfileService } from "../profile/profile.service";

export class BalancesService {
    constructor() {
    }

    public async depositMoneyToUser(depositor: Profile, receiver: Profile, amount: number, profileService: ProfileService, jobService: JobService): Promise<ResponseManagement> {
        if (amount > depositor.balance) {
            return {success: false, message: 'Not enough money in balance', statusCode: 200};
        }
        return await profileService.deposit(depositor, receiver, amount, jobService);
    }
}