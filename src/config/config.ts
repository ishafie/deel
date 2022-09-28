import { Dialect } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";

function isDialect (dialect: string): dialect is Dialect {
    return ["sqlite", "mysql", "postgres", "mariadb", "mssql", "db2", "snowflake", "oracle"].includes(dialect);
}

export const config: Config = {
    httpServer: {
        port: process.env.PORT || '3001'    
    },
    sequelize: {
        dialect: isDialect(process.env.SEQUELIZE_DIALECT) ? process.env.SEQUELIZE_DIALECT as Dialect : 'sqlite',
        storage: process.env.SEQUELIZE_STORAGE || './database.sqlite3',
        models: process.env.SEQUELIZE_MODELS ? [process.env.SEQUELIZE_MODELS] : [`${__dirname}/../models/**/*.model.ts`]
    }
}

export interface Config {
    httpServer: {
        port: string;
    }
    sequelize: SequelizeOptions
}