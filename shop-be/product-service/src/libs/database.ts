import { Sequelize } from "sequelize-typescript";

class Database {
  private static instance: Sequelize;

  private constructor() { }

  public static async getInstance(): Promise<Sequelize> {
    if (!Database.instance) {
      const databaseUrl = 'postgresql://master:password@shop-api-db-dev-postgresqlrdsinstance-afqf3nqz41en.chyjo9doj130.eu-west-1.rds.amazonaws.com:5432/shop_db'; //process.env.DATABASE_URL;
      Database.instance = new Sequelize(databaseUrl, { dialect: "postgres" });
      try {
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