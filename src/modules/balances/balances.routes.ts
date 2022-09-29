import { container } from "tsyringe";
import { BalancesController } from "./balances.controller";

const balanceInstance = container.resolve(BalancesController);
export const balancesRoute = [
    {
        url: '/balances/deposit/:userId',
        method: 'post',
        handler: balanceInstance.depositMoneyToUser.bind(balanceInstance)
    }
];