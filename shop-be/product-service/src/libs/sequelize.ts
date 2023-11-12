import { Sequelize } from "sequelize-typescript";
import config from "dotenv";

config.config();

const databaseUrl = 'postgresql://master:password@shop-api-db-dev-postgresqlrdsinstance-afqf3nqz41en.chyjo9doj130.eu-west-1.rds.amazonaws.com:5432/shop_db'//process.env.DATABASE_URL;

const createDatabase = async () => {
  try {
    return new Sequelize(databaseUrl, { dialect: "postgres" });
  } catch (error) {
    console.log("Error while connecting to the database", error);
    console.log(`Connection string: ${databaseUrl}`)
    return undefined;
  }
};

export const sequelize = createDatabase();
