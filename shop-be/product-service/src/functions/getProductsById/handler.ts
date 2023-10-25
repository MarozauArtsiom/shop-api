import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import Mock from '@mock/mock-products.json'

export const main: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const idParam = event.pathParameters?.id;
  const item = Mock.body.find((item) => item.id === idParam) || {};
  return formatJSONResponse({
    ...item
  }, {
    statusCode: item ? 200 : 404
  });
};

