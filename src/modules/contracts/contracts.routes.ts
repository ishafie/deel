import { container } from "tsyringe";
import { ContractsController } from "./contracts.controller";

const contractInstance = container.resolve(ContractsController);
export const contractsRoute = [
    {
        url: '/contracts/:id',
        method: 'get',
        handler: contractInstance.getContractById.bind(contractInstance)
    },
    {
        url: '/contracts',
        method: 'get',
        handler: contractInstance.getContractsOfProfile.bind(contractInstance)
    },
];