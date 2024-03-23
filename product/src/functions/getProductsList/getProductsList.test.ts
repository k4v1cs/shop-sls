import { describe, expect, it } from '@jest/globals';
import { getProductsList } from './getProductsList';
import { Product } from '@libs/productService';

jest.mock('@libs/productService', () => {
    return {
        ProductService: jest.fn().mockImplementation(() => {
            return {
                getProducts: () => {
                    return Promise.resolve(PRODUCTS);
                },
            };
        })
    };
});

const PRODUCTS: Product[] = [{
    title: 'foo',
    description: 'bar',
    price: 12.2,
    count: 0,
    id: '666'
}, {
    title: 'baz',
    description: 'bazz',
    price: 10.2,
    count: 4,
    id: '777'
}];

describe('getProductsList', () => {
    it('should return product list', async () => {
        const output = { statusCode: 200, body: JSON.stringify(PRODUCTS) };

        const res = await getProductsList();
        expect(res).toEqual(
            expect.objectContaining(output)
        );

    });
});
