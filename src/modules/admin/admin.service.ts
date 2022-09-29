import * as moment from 'moment';
import Profile from "../../models/profile.model";
import { delay, inject, injectable, registry } from "tsyringe";
import { IAdminService } from "./admin.interface";
import { IProfileService } from "../profile/profile.interface";
import { ProfileService } from '../profile/profile.service';
@injectable()
export class AdminService implements IAdminService {

    constructor(
      @inject('IProfileService') private readonly profileService: IProfileService
   ) {}

    public async getBestProfession(start: moment.Moment, end: moment.Moment): Promise<Profile> {
      try {
         return await this.profileService.getBestProfession(start, end);
      } catch (error: any) {
         console.error(error);
         throw error;
      }
    }

    public async getBestClients(start: moment.Moment, end: moment.Moment, limit: number): Promise<Profile[]> {
      try {
        return await this.profileService.getBestClients(start, end, limit);
      }
      catch (error:any) {
         console.error(error);
         throw error;
      }
     }
}