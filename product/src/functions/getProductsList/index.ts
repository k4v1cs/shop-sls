//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        summary: 'Product list',
        description: 'Returns the full list of products',
        responseData: {
          200: {
            description: 'The list of products',
            bodyType: 'Products',
          },
          500: 'server error',
        }
      },
    },
  ],
};
