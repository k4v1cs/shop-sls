import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        cors: true,
        summary: 'Create new product',
        description: 'Creates new product and returns it as a result',
        bodyType: 'CreateProduct',
        responseData: {
          200: {
            description: 'The newly created product',
            bodyType: 'Product',
          },
          500: 'server error',
          400: 'Bad Request'
        }
      },
    },
  ],
};
