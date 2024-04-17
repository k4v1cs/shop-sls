import { catalogBatchProcess } from './catalogBatchProcess';
import middy from '@middy/core';

export const main = middy(catalogBatchProcess);
