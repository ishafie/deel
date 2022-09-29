import { Sequelize } from 'sequelize-typescript'
import { config } from '../config/config';

export function initDatabase() {
    global.sequelize = new Sequelize({
        dialect: config.sequelize.dialect,
        storage: config.sequelize.storage,
        models: config.sequelize.models
    });
}