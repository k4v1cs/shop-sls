import { describe, expect, it } from '@jest/globals';
import { getProductsList } from './getProductsList';
import { Product } from '@type/api-types';
import { ProductService } from '@libs/productService';

jest.mock('@libs/productService');

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
        jest.spyOn(ProductService.prototype, 'getProducts').mockResolvedValue(PRODUCTS);

        const output = { statusCode: 200, body: JSON.stringify(PRODUCTS) };

        const res = await getProductsList({});
        expect(res).toEqual(
            expect.objectContaining(output)
        );

    });
    it('should return 500 on error', async () => {
        jest.spyOn(ProductService.prototype, 'getProducts').mockRejectedValueOnce(new Error('Something went wrong'));
        const output = { statusCode: 500 };

        const res = await getProductsList({});
        expect(res).toEqual(
            expect.objectContaining(output)
        );
    });
});
