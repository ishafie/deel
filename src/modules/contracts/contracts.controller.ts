import { Response, NextFunction, Request } from "express";
import { delay, inject, injectable, registry } from "tsyringe";
import Contract from "../../models/contract.model";
import Profile from "../../models/profile.model";
import { IProfileService } from "../profile/profile.interface";
import { ProfileService } from "../profile/profile.service";
import { IContractService } from "./contracts.interface";
import { ContractRepository } from "./contracts.repository";
import { ContractService } from "./contracts.service";
@injectable()
@registry([
    {token: 'IContractService', useToken: delay(() => ContractService)},
    {token: 'IProfileService', useToken: delay(() => ProfileService)},
    {token: 'IContractRepository', useToken: delay(() => ContractRepository)},
]) 
export class ContractsController {

    constructor (
        @inject('IProfileService') private readonly profileService: IProfileService, 
        @inject('IContractService') private readonly contractService: IContractService
    ) {}

    public async getContractById(req: Request, res: Response, next: NextFunction): Promise<Contract> {
        try {
            const contract_id: number = !isNaN(req.params.id) ? Number.parseInt(req.params.id) : null;
            const profile_id: number = !isNaN(req.query.profile_id) ? Number.parseInt(req.query.profile_id) : null;
            // Should use authentication, for example a JWT token to determine user identity instead of profile_id in query.
            if (!contract_id || !profile_id) {
                return res.status(401).end();
            }
            const profile: Profile = await this.profileService.getProfileById(profile_id);
            if (!profile) {
                return res.status(401).end();
            }
            const contract: Contract = await this.contractService.getContractByIdForProfile(contract_id, profile_id);
            if (!contract) {
                return res.status(404).end();
            }
            return res.send(contract);
        } catch (err: any) {
            res.status(500).send({errors: [{message: "An unexpected error occured at ContractsController.getContractById", detail: err }]})
            next(err);
        }
    }

    public async getContractsOfProfile(req: Request, res: Response, next: NextFunction): Promise<Contract[]> {
        try {
            const profile_id: number = !isNaN(req.query.profile_id) ? Number.parseInt(req.query.profile_id) : null;
            if (!profile_id) {
                return res.status(401).end();
            }
            const profile: Profile = await this.profileService.getProfileById(profile_id);
            if (!profile) {
                return res.status(401).end();
            }
            const contract: Contract[] = await this.contractService.getNonTerminatedContractsOfProfile(profile_id);
            if (!contract) {
                return res.status(404).end();
            }
            return res.send(contract);
        } catch (err: any) {
            res.status(500).send({errors: [{message: "An unexpected error occured at ContractsController.getContractsOfProfile", detail: err }]})
            next(err);
        }
    }
    
}