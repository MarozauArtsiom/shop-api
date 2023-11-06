const { DataTypes, Sequelize } = require("sequelize");

function createTables(sequelize, transaction) {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    { transaction }
  );

  const Stock = sequelize.define(
    "Stock",
    {
      product_id: {
        type: DataTypes.UUID,
        references: {
          model: Product,
          key: "id",
        },
      },
      count: {
        type: DataTypes.INTEGER,
      },
    },
    { transaction }
  );

  Product.hasOne(
    Stock,
    {
      foreignKey: "product_id",
    },
    { transaction }
  );

  Stock.belongsTo(
    Product,
    {
      foreignKey: "product_id",
    },
    { transaction }
  );

  return {
    Product,
    Stock,
  };
}

module.exports = createTables;
