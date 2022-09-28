import { Response, NextFunction, Request } from "express";
import Contract from "../../models/contract.model";
import Profile from "../../models/profile.model";
import { ProfileService } from "../profile/profile.service";
import { ContractService } from "./contracts.service";

export class ContractsController {
    public async getContractById(req: Request, res: Response, next: NextFunction): Promise<Contract> {
        try {
            const contract_id: number = !isNaN(req.params.id) ? Number.parseInt(req.params.id) : null;
            const profile_id: number = !isNaN(req.query.profile_id) ? Number.parseInt(req.query.profile_id) : null;
            // Should use authentication, for example a JWT token to determine user identity instead of profile_id in query.
            if (!contract_id || !profile_id) {
                return res.status(401).end();
            }
            const profileService = new ProfileService();
            const profile: Profile = await profileService.getProfileById(profile_id);
            if (!profile) {
                return res.status(401).end();
            }
            const contractService = new ContractService();
            const contract: Contract = await contractService.getContractByIdForProfile(contract_id, profile_id);
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
            const profileService = new ProfileService();
            const profile: Profile = await profileService.getProfileById(profile_id);
            if (!profile) {
                return res.status(401).end();
            }
            const contractService = new ContractService();
            const contract: Contract[] = await contractService.getNonTerminatedContractsOfProfile(profile_id);
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