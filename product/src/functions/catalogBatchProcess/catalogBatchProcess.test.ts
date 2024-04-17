import { catalogBatchProcess } from "./catalogBatchProcess";
import { ProductService } from '@libs/productService';
import { PublishCommand } from "@aws-sdk/client-sns";

jest.mock('@libs/productService');
jest.mock('@aws-sdk/client-sns');

const product1 = { title: "Amigurumi Phoenix Dragon Doll", description: "Mystical creature amigurumi doll combining features of phoenix and dragon.", price: 28.99, count: 45 };
const product2 = { title: "Crochet Phoenix Doll", description: "Fiery phoenix amigurumi doll with vibrant feathers.", price: 24.99, count: 30 };

const event = {
    Records: [
        {
            messageId: '87b15a46-fbe7-4cda-a097-d8f913d27163',
            body: JSON.stringify(product1),
            receiptHandle: 'foo',
            attributes: {
                ApproximateReceiveCount: '0',
                SentTimestamp: '',
                SenderId: '',
                ApproximateFirstReceiveTimestamp: ''
            },
            messageAttributes: {},
            md5OfBody: '40c58f455cca11e3bbb6072f5af957ae',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn',
            awsRegion: 'eu-central-1'
        },
        {
            messageId: '8403e924-bae7-45e2-9b1c-9f94040ff3d2',
            body: JSON.stringify(product2),
            receiptHandle: 'foo',
            attributes: {
                ApproximateReceiveCount: '0',
                SentTimestamp: '',
                SenderId: '',
                ApproximateFirstReceiveTimestamp: ''
            },
            messageAttributes: {},
            md5OfBody: '40c58f455cca11e3bbb6072f5af957ae',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn',
            awsRegion: 'eu-central-1'
        }
    ]
}
describe('catalogBatchProcess', () => {
    it('should save all products', async () => {
        const saveSpy = jest.spyOn(ProductService.prototype, 'saveProduct').mockResolvedValue({...product1, id: '1'});

        await catalogBatchProcess(event);

        expect(saveSpy).toHaveBeenCalledTimes(2);
        expect(saveSpy).toHaveBeenNthCalledWith(1, product1);
        expect(saveSpy).toHaveBeenNthCalledWith(2, product2);
        expect(PublishCommand).toHaveBeenCalledTimes(2);
    });
});