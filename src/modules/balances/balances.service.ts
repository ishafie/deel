import { injectable } from "tsyringe";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { ProfileService } from "../profile/profile.service";
@injectable()
export class BalancesService {
    constructor(private readonly profileService: ProfileService) {
    }

    public async depositMoneyToUser(depositor: Profile, receiver: Profile, amount: number): Promise<ResponseManagement> {
        if (amount > depositor.balance) {
            return {success: false, message: 'Not enough money in balance', statusCode: 200};
        }
        return await this.profileService.deposit(depositor, receiver, amount);
    }
}