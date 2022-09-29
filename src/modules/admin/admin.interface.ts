import Profile from "../../models/profile.model";
import { IProfileService } from "../profile/profile.interface";


export interface IAdminService {
    getBestProfession(start: moment.Moment, end: moment.Moment, profileService: IProfileService): Promise<Profile>;
    getBestClients(start: moment.Moment, end: moment.Moment, limit: number, profileService: IProfileService): Promise<Profile[]>;
}