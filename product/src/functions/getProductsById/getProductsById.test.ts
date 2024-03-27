import { describe, expect, it } from '@jest/globals';
import { getProductsById } from './getProductsById';
import { Product } from '@type/api-types';
import { ProductService } from '@libs/productService';

jest.mock('@libs/productService');

const NOT_FOUND_ID = '123';
const ERROR_ID = '000';
const PRODUCT: Product = {
    title: 'foo',
    description: 'bar',
    price: 12.2,
    count: 0,
    id: '666'
};

describe('getProductsById', () => {
    beforeEach(() => {
        jest.spyOn(ProductService.prototype, 'getProduct').mockImplementation((productId: string) => {
            if (productId === NOT_FOUND_ID) {
                return Promise.resolve(null);
            }
            if (productId === ERROR_ID) {
                throw new Error('Something went wrong');
            }
            return Promise.resolve(PRODUCT);
        });
    });
    it('should return product', async () => {
        const input = {
            pathParameters: {
                productId: '666'
            }
        };
        const output = { statusCode: 200, body: JSON.stringify(PRODUCT) };

        const res = await getProductsById(input);
        expect(res).toEqual(
            expect.objectContaining(output)
        );

    });

    it('should return 404 for not found products', async () => {
        const input = {
            pathParameters: {
                productId: NOT_FOUND_ID
            }
        };
        const output = { statusCode: 404 };

        const res = await getProductsById(input);
        expect(res).toEqual(
            expect.objectContaining(output)
        );
    });

    it('should return 500 on error', async () => {
        const input = {
            pathParameters: {
                productId: ERROR_ID
            }
        };
        const output = { statusCode: 500 };

        const res = await getProductsById(input);;
        expect(res).toEqual(
            expect.objectContaining(output)
        );
    });
});
