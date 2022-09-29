import { Response, NextFunction, Request } from "express";
import { injectable } from "tsyringe";
import Job from "../../models/job.model";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { ProfileService } from "../profile/profile.service";
import { JobService } from "./jobs.service";
@injectable()
export class JobsController {
    constructor(private readonly profileService: ProfileService, private readonly jobService: JobService) {}

    public async getUnpaidJobs(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const profile_id: number = !isNaN(req.query.profile_id) ? Number.parseInt(req.query.profile_id) : null;
            if (!profile_id) {
                return res.status(401).end();
            }
            const profile: Profile = await this.profileService.getProfileById(profile_id);
            if (!profile) {
                return res.status(401).end();
            }
            const jobs: Job[] = await this.jobService.getUnpaidJobsOfProfile(profile_id);
            return res.send(jobs);
        } catch (err: any) {
            res.status(500).send({errors: [{message: "An unexpected error occured at JobsController.getUnpaidJobs", detail: err }]})
            next(err);
        }
    }

    public async payJobById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const profile_id: number = !isNaN(req.query.profile_id) ? Number.parseInt(req.query.profile_id) : null;
            const job_id: number = !isNaN(req.params.job_id) ? Number.parseInt(req.params.job_id) : null;
            if (!profile_id || !job_id) {
                return res.status(401).end();
            }
            const profile: Profile = await this.profileService.getProfileById(profile_id);
            if (!profile) {
                return res.status(401).end();
            }
            const transaction: ResponseManagement = await this.jobService.payJobById(profile, job_id, this.profileService);
            return res.status(transaction.statusCode).send(transaction);
        } catch (err: any) {
            res.status(500).send({errors: [{message: "An unexpected error occured at JobsController.payJobById", detail: err }]})
            next(err);
        }
    }
}