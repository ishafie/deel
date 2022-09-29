import { inject, injectable } from "tsyringe";
import { IContractRepository, IContractService } from "./contracts.interface";
@injectable()
export class ContractService implements IContractService {

    constructor(
        @inject('IContractRepository') private readonly contractRepository: IContractRepository) {
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