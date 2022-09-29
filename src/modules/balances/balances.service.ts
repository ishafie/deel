import { inject, injectable } from "tsyringe";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { IProfileService } from "../profile/profile.interface";
import { IBalancesService } from "./balances.interface";
@injectable()
export class BalancesService implements IBalancesService {
    constructor(
        @inject('IProfileService') private readonly profileService: IProfileService
    ) {}

    public async depositMoneyToUser(depositor: Profile, receiver: Profile, amount: number): Promise<ResponseManagement> {
        if (amount > depositor.balance) {
            return {success: false, message: 'Not enough money in balance', statusCode: 200};
        }
        return await this.profileService.deposit(depositor, receiver, amount);
    }
}