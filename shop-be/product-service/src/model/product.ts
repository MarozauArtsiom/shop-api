import { DataTypes, UUIDV4 } from "sequelize";
import database from "@libs/database";

const getProduct = async () => {
  try {
    const sequelize = await database.getInstance();

    const Product = sequelize.define('Products', {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: "Products",
    });

    return Product;
  } catch (error) {
    console.error('Error initializing Product model:', error);
  }
}

export { getProduct };