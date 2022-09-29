import { Op } from "sequelize";
import { injectable } from "tsyringe";
import Contract, { ContractEnum } from "../../models/contract.model";
import { IContractRepository } from "./contracts.interface";

@injectable()
export class ContractRepository implements IContractRepository {
    
    public async getContractById(contract_id: number) {
        return await Contract.findOne({where: {id: contract_id}});
    }

    public async getContractByIdForProfile(contract_id: number, profile_id: number) {
        return await Contract.findOne({
            where: {
                id: contract_id, 
                [Op.or]: [
                    {ContractorId: profile_id},
                    {ClientId: profile_id}
                ]
            }
        });
    }

    public async getNonTerminatedContractsOfProfile(profile_id: number) {
        return await Contract.findAll({
            where: {
                [Op.or]: [
                    {ContractorId: profile_id},
                    {ClientId: profile_id}
                ],
                status: { [Op.not]: ContractEnum.TERMINATED }
            }
        });
    }

    public async getActiveContractsOfProfile(profile_id: number) {
        return await Contract.findAll({
            where: {
                [Op.or]: [
                    {ContractorId: profile_id},
                    {ClientId: profile_id}
                ],
                status: ContractEnum.IN_PROGRESS
            }
        });
    }

    
}