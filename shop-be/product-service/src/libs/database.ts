import { Sequelize } from "sequelize";

const databaseUrl = process.env.CONNECTION_STRING;
const isProd = process.env.NODE_ENV === "prod";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static async getInstance(): Promise<Sequelize> {
    if (Database.instance) {
      return Database.instance;
    }

    try {
      console.log("Creating new instance of Sequelize");
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

      console.log("databaseUrl", databaseUrl);
      console.log("isProd", isProd);
      console.log("process.env.NODE_ENV", process.env.NODE_ENV);

      Database.instance = new Sequelize(databaseUrl, {
        dialect: "postgres",
        ...prodOption,
      });

      console.log("Database instance authenticating");
      await Database.instance.authenticate();
      console.log("Database instance authenticated");
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw new Error(`Unable to connect to the database, ${error}`);
    }
  }
}

export default Database;
