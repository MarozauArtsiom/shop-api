import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { main as getProductsList } from '../getProductsList/handler'
import { APIGatewayProxyResult } from 'aws-lambda';

export const main: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  const data = await getProductsList() as APIGatewayProxyResult
  console.log(data)
  return formatJSONResponse(
    Object.values(JSON.parse(data.body)).map(x => ({...x, count: Math.trunc(Math.random() * 100)}))
  );
};
