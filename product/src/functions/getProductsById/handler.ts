//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProductsById } from './getProductsById';

export const main = middyfy(getProductsById);
