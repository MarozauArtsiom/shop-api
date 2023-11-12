import Product from './product';
import Stock from './stock';

Product.hasOne(Stock, {
  foreignKey: 'product_id',
  as: 'stock',
});

Stock.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});

export { Product, Stock };
