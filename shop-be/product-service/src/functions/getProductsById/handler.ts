import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import getDatabase from "@model/database";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main: ValidatedEventAPIGatewayProxyEvent<void> = async (
  event: APIGatewayProxyEvent
) => {
  try {
    const id: string = event.pathParameters.id;

    console.log("Fetching stock items");
    const { Stock, Product } = await getDatabase();
    const stockItem = await Product.findByPk(id, {
      include: [
        {
          model: Stock,
        },
      ],
    });
    console.log(`Fetched stock item by id: ${id}`, stockItem);

    if (!stockItem) {
      console.log(`Stock item with id ${id} not found`)
      return formatJSONResponse(
        { message: `Stock item with id ${id} not found` },
        { statusCode: 404 }
      );
    }

    console.log("Start mapping stock items");
    const result = {
      id: stockItem.id,
      title: stockItem.title,
      description: stockItem.description,
      price: stockItem.price,
      count: stockItem.Stock?.count,
    };
    console.log("End mapping stock items", result);

    return formatJSONResponse(result);
  } catch (error) {
    console.log("Error while getting the stock list", error);
    return formatJSONResponse(
      { message: `Internal server error` },
      { statusCode: 500 }
    );
  }
};
