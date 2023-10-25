import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import Mock from '@mock/mock-products.json'

export const main: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  return formatJSONResponse(
    [...Mock.body]
  );
};
