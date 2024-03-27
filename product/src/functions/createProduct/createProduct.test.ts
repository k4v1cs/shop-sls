import { describe, expect, it } from '@jest/globals';
import { createProduct } from './createProduct';
import { Product, CreateProduct } from '@type/api-types';
import { ProductService } from '@libs/productService';

jest.mock('@libs/productService');

const CREATE_PRODUCT: CreateProduct = {
    title: 'foo',
    description: 'bar',
    price: 12.2,
    count: 0
};

const PRODUCT: Product = {
    ...CREATE_PRODUCT,
    id: '666'
};

describe('createProduct', () => {
    it('should save product', async () => {
        jest.spyOn(ProductService.prototype, 'saveProduct').mockResolvedValue(PRODUCT);

        const input = {body: CREATE_PRODUCT};
        const output = { statusCode: 200, body: JSON.stringify(PRODUCT) };

        const res = await createProduct(input);
        expect(res).toEqual(
            expect.objectContaining(output)
        );

    });
    it('should return 500 on error', async () => {
        jest.spyOn(ProductService.prototype, 'saveProduct').mockRejectedValueOnce(new Error('Something went wrong'));
        const input = {body: CREATE_PRODUCT};
        const output = { statusCode: 500 };

        const res = await createProduct(input);
        expect(res).toEqual(
            expect.objectContaining(output)
        );
    });
});