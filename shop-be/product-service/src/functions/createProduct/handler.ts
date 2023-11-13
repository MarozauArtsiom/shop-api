import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import getDatabase from "@model/database";
import Database from "@libs/database";

import schema from "./schema";

const isProductValid = (productDto) => {
  if (!productDto) {
    return false;
  }

  if (!productDto.title) {
    return false;
  }

  if (!productDto.description) {
    return false;
  }

  if (!productDto.price) {
    return false;
  }

  if (!productDto.count) {
    return false;
  }

  return true;
};

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const productDto = event.body;

  if (!isProductValid(productDto)) {
    return formatJSONResponse(
      {
        message: `Product is not valid`,
        event,
      },
      {
        statusCode: 400,
      }
    );
  }

  try {
    const sequelize = await Database.getInstance();
    const { Stock, Product } = await getDatabase();

    console.log("Create transaction to insert Stock and Product");
    const transaction = await sequelize.transaction();

    console.log("Insert Stock");
    const newProduct = await Product.create({
      title: productDto.title,
      description: productDto.description,
      price: productDto.price,
    }, { transaction });

    console.log("Insert Stock")
    await Stock.create({
      productId: newProduct.id,
      count: productDto.count,
    }, { transaction })

    console.log('Commit transaction')
    await transaction.commit();

  } catch (error) {
    console.error("Error initializing Product model:", error, productDto);
  }

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
