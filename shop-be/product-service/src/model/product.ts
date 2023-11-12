import { Model, DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from '@libs/sequelize';

interface ProductAttributes {
  id: string;
  title: string;
  description?: string; // use '?' for optional properties
  price?: number;
}

export class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: string;
  public title!: string;
  public description!: string;
  public price!: number;
}

Product.init({
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
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'products',
});

export default Product;
