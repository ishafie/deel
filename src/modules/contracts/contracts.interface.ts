export interface IContractService {
    getContractById(contract_id: number);
    getContractByIdForProfile(contract_id: number, profile_id: number);
    getNonTerminatedContractsOfProfile(profile_id: number);
    getActiveContractsOfProfile(profile_id: number);
}

export interface IContractRepository{
    getContractById(contract_id: number);
    getContractByIdForProfile(contract_id: number, profile_id: number);
    getNonTerminatedContractsOfProfile(profile_id: number);
    getActiveContractsOfProfile(profile_id: number);
}