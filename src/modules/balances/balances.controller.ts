import { Response, NextFunction, Request } from "express";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { JobService } from "../jobs/job.service";
import { ProfileService } from "../profile/profile.service";
import { BalancesService } from "./balances.service";

export class BalancesController {

    public async depositMoneyToUser(req: Request, res: Response, next: NextFunction): Promise<any> {
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
            const profileService = new ProfileService();
            const depositor: Profile = await profileService.getProfileById(profile_id);
            const receiver: Profile = await profileService.getProfileById(userId);
            if (!depositor || !receiver) {
                return res.status(401).end();
            }
            const balancesService = new BalancesService();
            const jobService = new JobService();
            const transaction: ResponseManagement = await balancesService.depositMoneyToUser(depositor, receiver, amount, profileService, jobService);
            return res.status(transaction.statusCode).send(transaction);
        } catch (err: any) {
            res.status(500).send({errors: [{message: "An unexpected error occured at BalancesController.getUnpaidBalances", detail: err }]})
            next(err);
        }
    }
}