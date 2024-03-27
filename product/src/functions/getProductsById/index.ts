//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true,
        summary: 'Get product by id',
        description: 'Returns the product object belonging to the given id',
        responseData: {
          200: {
            description: 'The product',
            bodyType: 'Product',
          },
          404: "No product can be found for the given id",
          500: 'server error',
        }
      },
    },
  ],
};
