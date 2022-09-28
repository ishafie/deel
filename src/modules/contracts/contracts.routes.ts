import { ContractsController } from "./contracts.controller";

const contractController = new ContractsController();
export const contractsRoute = [
    {
        url: '/contracts/:id',
        method: 'get',
        handler: contractController.getContractById
    },
    {
        url: '/contracts',
        method: 'get',
        handler: contractController.getContractsOfProfile
    },
];