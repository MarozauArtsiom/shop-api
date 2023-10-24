import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

const handle: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  return formatJSONResponse({
    shopAdminName: 'Artsiom',
  });
};

export const main = handle;
