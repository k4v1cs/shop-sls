import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { createProduct } from './createProduct';

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => createProduct(event);

export const main = middyfy(create);
