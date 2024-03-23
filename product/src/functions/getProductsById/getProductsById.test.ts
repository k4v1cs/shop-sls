import { describe, expect, it } from '@jest/globals';
import { getProductsById } from './getProductsById';
import { Product } from '@libs/productService';

jest.mock('@libs/productService', () => {
    return {
        ProductService: jest.fn().mockImplementation(() => {
            return {
                getProduct: (productId: string) => {
                    return Promise.resolve(productId === NOT_FOUND_ID ? null : PRODUCT);
                },
            };
        })
    };
});

const NOT_FOUND_ID = '123';
const PRODUCT: Product = {
    title: 'foo',
    description: 'bar',
    price: 12.2,
    count: 0,
    id: '666'
};

describe('getProductsById', () => {
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
});
