//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        summary: 'Product list',
        description: 'Returns the full list of products',
        responseData: {
          200: {
            description: 'The list of products',
            bodyType: 'Products',
          },
          502: 'server error',
        }
      },
    },
  ],
};
