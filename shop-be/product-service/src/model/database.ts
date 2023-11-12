import { getProduct } from "./product";
import { getStock } from "./stock";
import Database from "@libs/database";

let models;

const getDatabase = async () => {
  if (models) {
    console.log('Returning existing models...');
    return models;
  }

  console.log("Getting Sequelize instance...");
  const sequelize = await Database.getInstance();
  const Product = await getProduct();
  const Stock = await getStock();

  console.log("Defining associations...");
  Product.hasOne(Stock, {
    foreignKey: "product_id",
    as: "stock",
  });

  Stock.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });

  console.log("Synchronizing models with database...");
  await sequelize.sync();

  console.log("Database setup complete.");

  models = { Product, Stock };
  return models;
};

export default getDatabase;