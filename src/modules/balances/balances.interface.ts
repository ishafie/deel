import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";

export interface IBalancesService {
    depositMoneyToUser(depositor: Profile, receiver: Profile, amount: number): Promise<ResponseManagement>;
}