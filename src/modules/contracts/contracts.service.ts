import { injectable } from "tsyringe";
import { ContractRepository } from "./contracts.repository";
@injectable()
export class ContractService {

    constructor(private readonly contractRepository: ContractRepository) {
    }

    public async getContractById(contract_id: number) {
        return await this.contractRepository.getContractById(contract_id);
    }

    public async getContractByIdForProfile(contract_id: number, profile_id: number) {
        return await this.contractRepository.getContractByIdForProfile(contract_id, profile_id);
    }

    public async getNonTerminatedContractsOfProfile(profile_id: number) {
        return await this.contractRepository.getNonTerminatedContractsOfProfile(profile_id);
    }

    public async getActiveContractsOfProfile(profile_id: number) {
        return await this.contractRepository.getActiveContractsOfProfile(profile_id);
    }

}