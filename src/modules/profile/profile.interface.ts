import Profile from "../../models/profile.model";
import {Moment} from 'moment';
import Job from "../../models/job.model";
import { ResponseManagement } from "../../models/response-management";
import { JobService } from "../jobs/jobs.service";

export interface IProfileRepository {
    getProfileById(profile_id: number);
    getBestProfession(start: Moment, end: Moment);
    getBestClients(start: Moment, end: Moment, limit: number);
    payBetweenUsers(payor: Profile, receiver: Profile, job: Job);
    payBetweenUsersSpecificAmount(payor: Profile, receiver: Profile, price: number);
}

export interface IProfileService {
    getProfileById(profile_id: number);
    pay(payor: Profile, receiver: Profile, job: Job);
    deposit(payor: Profile, receiver: Profile, amount: number): Promise<ResponseManagement>;
    getBestProfession(start: moment.Moment, end: moment.Moment): Promise<Profile> 
    getBestClients(start: moment.Moment, end: moment.Moment, limit: number);
}