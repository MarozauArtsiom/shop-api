import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@libs/sequelize'; // assuming you export the sequelize instance from this file
import Product from './product'; // import the associated model

interface StockAttributes {
  product_id: string;
  count?: number;
}

export class Stock extends Model<StockAttributes> implements StockAttributes {
  public product_id!: string;
  public count!: number;
}

Stock.init({
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: Product,
      key: 'id',
    },
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'stocks',
});

export default Stock;
