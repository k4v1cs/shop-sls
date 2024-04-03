import { importFileParser } from './importFileParser';
import middy from '@middy/core';

export const main = middy(importFileParser);
