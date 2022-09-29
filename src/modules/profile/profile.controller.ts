import { Response, NextFunction, Request } from "express";
import { delay, inject, injectable, registry } from "tsyringe";
import Profile from "../../models/profile.model";
import { JobService } from "../jobs/jobs.service";
import { IProfileService } from "./profile.interface";
import { ProfileRepository } from "./profile.repository";
import { ProfileService } from "./profile.service";

@injectable()
@registry([
    {token: 'IProfileService', useToken: delay(() => ProfileService)},
    {token: 'IProfileRepository', useToken: delay(() => ProfileRepository)},
    {token: 'IJobsService', useToken: delay(() => JobService)}
])
export class ProfileController {
    
    constructor(
        @inject('IProfileService') private readonly profileService: IProfileService
    ) {}

    public async getProfileById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const profile_id: number = !isNaN(req.params.profileId) ? Number.parseInt(req.params.profileId) : null;
            if (!profile_id) {
                return res.status(401).end();
            }
            const profile: Profile = await this.profileService.getProfileById(profile_id);
            if (!profile) {
                return res.status(404).end();
            }
            return res.send(profile);
        } catch (err: any) {
            console.log(err);
            res.status(500).send({errors: [{message: "An unexpected error occured at ProfileController.getProfileById", detail: err }]})
            next(err);
        }
    }
}