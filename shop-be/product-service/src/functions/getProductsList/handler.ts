import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import getDatabase from "@model/database";

const getStockItems = async () => {
  try {
    console.log('Fetching stock items')
    const { Stock, Product } = await getDatabase()
    const stockItems = await Stock.findAll({
      include: [{
        model: Product,
      }],
    });
    console.log('Fetched stock items', stockItems)

    console.log('Start mapping stock items')
    const result = stockItems.map(item => ({
      productId: item.product_id,
      productTitle: item.product?.title,
      count: item.count,
    }));
    console.log('End mapping stock items', result)
    return result;
  } catch (error) {
    console.error('Error fetching stock items:', error);
    throw error;
  }
};

export const main: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  try {
    return formatJSONResponse(await getStockItems());
  } catch (error) {
    console.log("Error while getting the stock list", error);
    return formatJSONResponse(
      { message: `Internal server error` },
      { statusCode: 500 }
    );
  }
};
