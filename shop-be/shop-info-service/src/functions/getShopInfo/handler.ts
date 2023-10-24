import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

const handle: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  return formatJSONResponse({
    shopName: 'MacRebel Gaming',
    workingHours: '10:00 - 20:00',
  });
};

export const main = handle;
