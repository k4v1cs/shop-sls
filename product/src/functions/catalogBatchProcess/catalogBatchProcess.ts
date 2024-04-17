import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { ProductService } from "@libs/productService";
import { SQSEvent } from "aws-lambda";

const productService = new ProductService();
const client = new SNSClient({});

export const catalogBatchProcess = async (event: SQSEvent) => {
    console.log(event);
    try {
        return Promise.all(event.Records?.map(async(record) => {
            const item = JSON.parse(record.body);
            console.log(`Processing item: ${record.body}`);
            const product = await productService.saveProduct(item);
            const message = `Product '${product.id}/${product.title}' saved succesfully`;
            console.log(message);
            await client.send(new PublishCommand({
                TopicArn: process.env.SNS_ARN,
                Message: message,
                Subject: 'Product created',
                MessageAttributes: {
                    isHighValue: {
                        DataType: 'String',
                        StringValue: (product.price > 30 ? 'yes': 'no')
                    }
                }
            }));
        }));
    } catch (e) {
        console.log('Failed to process products', e);
        return Promise.reject();
    }
}