import { AdminController } from "./admin.controller";

const adminController = new AdminController();
export const adminRoute = [
    {
        url: '/admin/best-profession',
        method: 'get',
        handler: adminController.getBestProfession
    },
    {
        url: '/admin/best-clients',
        method: 'get',
        handler: adminController.getBestClients
    }
];