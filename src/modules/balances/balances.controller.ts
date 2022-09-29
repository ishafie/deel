import { Response, NextFunction, Request } from "express";
import { delay, inject, injectable, registry } from "tsyringe";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { IProfileService } from "../profile/profile.interface";
import { ProfileService } from "../profile/profile.service";
import { IBalancesService } from "./balances.interface";
import { BalancesService } from "./balances.service";

@injectable()
@registry([
    {token: 'IProfileService', useToken: delay(() => ProfileService)},
    {token: 'IBalancesService', useToken: delay(() => BalancesService)}
]) 
export class BalancesController {

    constructor(
        @inject('IBalancesService') private readonly balancesService: IBalancesService,
        @inject('IProfileService') private readonly profileService: IProfileService
    ) {}

    public async depositMoneyToUser(req: Request, res: Response, next: NextFunction): Promise<ResponseManagement> {
        try {
            const userId: number = !isNaN(req.params.userId) ? Number.parseInt(req.params.userId) : null;
            const profile_id: number = !isNaN(req.query.profile_id) ? Number.parseInt(req.query.profile_id) : null;
            const amount: number = !isNaN(req.query.amount) ? Number.parseInt(req.query.amount) : null;
            if (!amount || amount <= 0 || profile_id === userId) {
                return res.status(400).end();
            }
            if (!profile_id || !userId) {
                return res.status(401).end();
            }
            const depositor: Profile = await this.profileService.getProfileById(profile_id);
            const receiver: Profile = await this.profileService.getProfileById(userId);
            if (!depositor || !receiver) {
                return res.status(401).end();
            }
            const transaction: ResponseManagement = await this.balancesService.depositMoneyToUser(depositor, receiver, amount);
            return res.status(transaction.statusCode).send(transaction);
        } catch (err: any) {
            res.status(500).send({errors: [{message: "An unexpected error occured at BalancesController.getUnpaidBalances", detail: err }]})
            next(err);
        }
    }
}