import { BalancesController } from "./balances.controller";

const balancesController = new BalancesController();
export const balancesRoute = [
    {
        url: '/balances/deposit/:userId',
        method: 'post',
        handler: balancesController.depositMoneyToUser
    }
];