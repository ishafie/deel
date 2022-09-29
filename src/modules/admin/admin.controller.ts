import { Response, NextFunction, Request } from "express";
import * as moment from 'moment';
import { AdminService } from "./admin.service";
import { injectable } from "tsyringe";

@injectable()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    public async getBestProfession(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const start: moment.Moment = req.query.start ? moment(req.query.start, 'MM/DD/YYYY') : null;
            const end: moment.Moment = req.query.end ? moment(req.query.end, 'MM/DD/YYYY') : null;
            if (start === null || end === null || !start.isValid() || !end.isValid() || start.isAfter(end)) {
                return res.status(400).end();
            }
            const bestProfession: any = await this.adminService.getBestProfession(start, end);
            return res.send({bestProfession});
        } catch (err: any) {
            res.status(500).send({errors: [{message: "An unexpected error occured at AdminController.getBestProfession", detail: err }]})
            next(err);
        }
    }

    public async getBestClients(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const start: moment.Moment = req.query.start ? moment(req.query.start, 'MM/DD/YYYY') : null;
            const end: moment.Moment = req.query.end ? moment(req.query.end, 'MM/DD/YYYY') : null;
            const limit: number = !isNaN(req.query.limit) ? Number.parseInt(req.query.limit) : null;
            if (!limit || limit <= 0 || start === null || end === null || !start.isValid() || !end.isValid() || start.isAfter(end)) {
                return res.status(400).end();
            }
            const bestClients: any = await this.adminService.getBestClients(start, end, limit);
            return res.send({bestClients});
        } catch (err: any) {
            res.status(500).send({errors: [{message: "An unexpected error occured at AdminController.getBestClients", detail: err }]})
            next(err);
        }
    }
}