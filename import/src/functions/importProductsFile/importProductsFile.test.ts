import { importProductsFile } from './importProductsFile';

jest.mock('@aws-sdk/client-s3');
import { PutObjectCommand } from '@aws-sdk/client-s3';
jest.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: () => Promise.resolve(SIGNED_URL)
}));

const SIGNED_URL = 'example-url.com';
const FILE_NAME = 'input.csv';

describe('importProductsFile', () => {

    it('should return signed url', async () => {
        const expectedInput = { Bucket: 'bucket-name-test', Key: `upload-folder-test/${FILE_NAME}` };
        const response = await importProductsFile({ queryStringParameters: { name: FILE_NAME } });
        expect(PutObjectCommand).toHaveBeenCalledWith(expectedInput);
        expect(response).toEqual(expect.objectContaining({
            statusCode: 200,
            body: JSON.stringify(SIGNED_URL),
        }));
    });
});