import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { QueryCommand, ScanCommand, TransactWriteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { mergeById } from './utils';
import { Product, CreateProduct } from '@type/api-types';
import { randomUUID } from 'crypto';

export class ProductService {
    private client: DynamoDBClient;
    private docClient: DynamoDBDocumentClient;
    constructor() {
        this.client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(this.client);
    }
    async getProducts(): Promise<Product[]> {
        const productCommand = new ScanCommand({
            TableName: process.env.PRODUCTS_TABLE,
        });
        const stockCommand = new ScanCommand({
            TableName: process.env.STOCKS_TABLE,
        });
        const [productResponse, stockResponse] = await Promise.all([this.docClient.send(productCommand), this.docClient.send(stockCommand)]);

        return Promise.resolve(mergeById(productResponse.Items, stockResponse.Items) as Product[]);
    }

    async getProduct(productId: string): Promise<Product | null> {
        const productCommand = new QueryCommand({
            TableName: process.env.PRODUCTS_TABLE,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': productId
            }
        });
        const stockCommand = new QueryCommand({
            TableName: process.env.STOCKS_TABLE,
            KeyConditionExpression: 'product_id = :product_id',
            ExpressionAttributeValues: {
                ':product_id': productId
            }
        });
        const [productResponse, stockResponse] = await Promise.all([this.docClient.send(productCommand), this.docClient.send(stockCommand)]);
        const products = mergeById(mergeById(productResponse.Items, stockResponse.Items));
        return Promise.resolve(products.length ? products[0] as Product : null);
    }

    async saveProduct(product: CreateProduct): Promise<Product> {
        const id = randomUUID();
        const writeCommand = new TransactWriteCommand({
            TransactItems: [{
                Put: {
                    TableName: process.env.PRODUCTS_TABLE,
                    Item: {
                        id: id,
                        title: product.title,
                        description: product.description,
                        price: product.price
                    }
                }
            }, {
                Put: {
                    TableName: process.env.STOCKS_TABLE,
                    Item: {
                        product_id: id,
                        count: product.count
                    }
                }
            }
            ]
        });

        await this.docClient.send(writeCommand);
        return {id: id, ...product};
    }
}