import { ProfileService } from "../profile/profile.service";
import * as moment from 'moment';

export class AdminService {
    constructor() {
    }

    public async getBestProfession(start: moment.Moment, end: moment.Moment, profileService: ProfileService): Promise<string> {
       return await profileService.getBestProfession(start, end);
    }

    public async getBestClients(start: moment.Moment, end: moment.Moment, limit: number, profileService: ProfileService): Promise<string> {
        return await profileService.getBestClients(start, end, limit);
     }
}