import { config } from './config/config';
import * as express from 'express';
import * as DatabaseInit from './database/init';
import { DeelRoutes } from './config/routes';

class Service {
    public app: express.Application;
    public routePrv: express.Routes;

    public async init() {
        try {
            this.app = express();
            global.sequelize = DatabaseInit.initDatabase();
            this.app.listen(config.httpServer?.port, () => {
                console.log(`Express App Listening on Port ${config.httpServer?.port}.`)
            });
            this.routePrv = new DeelRoutes();
            this.routePrv.routes(this.app);
        } catch (error: any) {
            console.error(`An error occurred: ${error}`);
            process.exit(1);
        }

    }

}


(new Service).init();