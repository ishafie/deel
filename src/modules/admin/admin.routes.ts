import { container } from "tsyringe";
import { AdminController } from "./admin.controller";

const adminInstance = container.resolve(AdminController);
export const adminRoute = [
    {
        url: '/admin/best-profession',
        method: 'get',
        handler: adminInstance.getBestProfession.bind(adminInstance)
    },
    {
        url: '/admin/best-clients',
        method: 'get',
        handler: adminInstance.getBestClients.bind(adminInstance)
    }
];