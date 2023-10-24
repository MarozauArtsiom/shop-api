import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import Mock from './mock-response.json'

export const main: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  return formatJSONResponse({
    ...Mock.body
  });
};
