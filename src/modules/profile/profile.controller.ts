import { Response, NextFunction, Request } from "express";
import { injectable } from "tsyringe";
import Profile from "../../models/profile.model";
import { IProfileService } from "./profile.interface";
import { ProfileService } from "./profile.service";

@injectable()
export class ProfileController {
    
    constructor(private readonly profileService: ProfileService) {}

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
            res.status(500).send({errors: [{message: "An unexpected error occured at ProfileController.getProfileById", detail: err }]})
            next(err);
        }
    }
}