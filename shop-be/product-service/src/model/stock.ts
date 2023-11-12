import { DataTypes } from "sequelize";
import database from "@libs/database";

const getStock = async () => {
  try {
    const sequelize = await database.getInstance();

    const Stock = sequelize.define('Stock', {
      product_id: {
        type: DataTypes.UUID,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, {
      tableName: "stocks",
    });

    return Stock;
  } catch (error) {
    console.error('Error initializing Stock model:', error);
  }
}

export { getStock };