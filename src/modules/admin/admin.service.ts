import { ProfileService } from "../profile/profile.service";
import * as moment from 'moment';
import Profile from "../../models/profile.model";

export class AdminService {
    constructor() {
    }

    public async getBestProfession(start: moment.Moment, end: moment.Moment, profileService: ProfileService): Promise<Profile> {
      try {
         return await profileService.getBestProfession(start, end);
      } catch (error: any) {
         throw error;
      }
    }

    public async getBestClients(start: moment.Moment, end: moment.Moment, limit: number, profileService: ProfileService): Promise<Profile[]> {
      try {
        return await profileService.getBestClients(start, end, limit);
      }
      catch (error:any) {
         throw error;
      }
     }
}