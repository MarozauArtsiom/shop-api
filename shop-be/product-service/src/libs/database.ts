import { Sequelize } from "sequelize-typescript";
require('dotenv').config();

const databaseUrl = process.env.CONNECTION_STRING;
const isProd = process.env.NODE_ENV === "prod";

class Database {
  private static instance: Sequelize;

  private constructor() { }

  public static async getInstance(): Promise<Sequelize> {
    if (!Database.instance) {
      try {
        const prodOption = isProd
        ? {
            dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            },
          }
        : {};
        Database.instance = new Sequelize(databaseUrl, { dialect: "postgres", ...prodOption });
        await Database.instance.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
    return Database.instance;
  }
}

export default Database;