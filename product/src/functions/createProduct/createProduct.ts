import { ProductService } from '@libs/productService';
import { formatJSONResponse } from '@libs/api-gateway';

export const createProduct = async (event) => {
    try {
        console.log('createProduct lambda called with', event);
        const productService = new ProductService();
        const product = await productService.saveProduct(event.body);
        return formatJSONResponse(product);
    } catch (e) {
        return formatJSONResponse({ message: "Failed to save new product" }, 500);
    }
};