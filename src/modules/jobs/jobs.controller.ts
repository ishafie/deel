import { Response, NextFunction, Request } from "express";
import Job from "../../models/job.model";
import Profile from "../../models/profile.model";
import { ResponseManagement } from "../../models/response-management";
import { ProfileService } from "../profile/profile.service";
import { JobService } from "./job.service";

export class JobsController {
    public async getUnpaidJobs(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const profile_id: number = !isNaN(req.query.profile_id) ? Number.parseInt(req.query.profile_id) : null;
            if (!profile_id) {
                return res.status(401).end();
            }
            const profileService = new ProfileService();
            const profile: Profile = await profileService.getProfileById(profile_id);
            if (!profile) {
                return res.status(401).end();
            }
            const jobService = new JobService();
            const jobs: Job[] = await jobService.getUnpaidJobsOfProfile(profile_id);
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
            const profileService = new ProfileService();
            const profile: Profile = await profileService.getProfileById(profile_id);
            if (!profile) {
                return res.status(401).end();
            }
            const jobService = new JobService();
            const transaction: ResponseManagement = await jobService.payJobById(profile, job_id, profileService);
            return res.status(transaction.statusCode).send(transaction);
        } catch (err: any) {
            res.status(500).send({errors: [{message: "An unexpected error occured at JobsController.payJobById", detail: err }]})
            next(err);
        }
    }
}