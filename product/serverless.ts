import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';
import dynamoDb from './dynamoDb';

const serverlessConfiguration: AWS = {
  service: 'product',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    profile: 'sls',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: '${self:custom.dynamoDb.productsTableName}',
      STOCKS_TABLE: '${self:custom.dynamoDb.stocksTableName}'
    },
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: [
        'dynamodb:DescribeTable',
        'dynamodb:Query',
        'dynamodb:Scan',
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem'
      ],
      Resource: [{"Fn::GetAtt": [ "productsTable", "Arn" ]}, {"Fn::GetAtt": [ "stocksTable", "Arn" ]}]
    }],
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      host: "ny8ieu19k1.execute-api.eu-central-1.amazonaws.com/dev"
    },
    dynamoDb: {
      productsTableName: 'products',
      stocksTableName: 'stocks'
    }
  },
  resources: {
    Resources: dynamoDb
  }
};

module.exports = serverlessConfiguration;
