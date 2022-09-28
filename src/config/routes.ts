import { Application } from "express";
import { adminRoute } from "../modules/admin/admin.routes";
import { balancesRoute } from "../modules/balances/balances.routes";
import { contractsRoute } from "../modules/contracts/contracts.routes";
import { jobsRoute } from "../modules/jobs/jobs.routes";
import { profileRoute } from "../modules/profile/profile.routes";
export class DeelRoutes {
    public routes(app: Application): void {
        [ contractsRoute, jobsRoute, profileRoute, balancesRoute, adminRoute ].forEach((routes) => {
            routes.forEach((route) => {
                if (route.url && route.method) {
                    app.route(route.url)[route.method?.toLocaleLowerCase()](route.handler)
                }
            })
        });
    }
}