import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { Stock, Product } from "@model/database";

export const main: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  let stockList;
  try {
    stockList = await Stock.findAll({
      include: [
        {
          model: Product,
          as: "product",
          required: true,
        },
      ],
    });
  } catch (error) {
    console.log("Error while getting the stock list", error);
    return formatJSONResponse(
      { message: "Internal server error" },
      { statusCode: 500 }
    );
  }
  return formatJSONResponse(
    stockList.map((x) => ({
      id: x.product.id,
      title: x.product.title,
      description: x.product.description,
      price: x.product.price,
      count: x.count,
    }))
  );
};
