import { Moment } from "moment";
import Profile from "../../models/profile.model";

export interface IAdminService {
    getBestProfession(start: Moment, end: Moment): Promise<Profile>;
    getBestClients(start: Moment, end: Moment, limit: number): Promise<Profile[]>;
}