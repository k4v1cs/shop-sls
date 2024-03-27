import { ProductService } from '@libs/productService';
import { formatJSONResponse } from '@libs/api-gateway';

const getProductsList = async (event) => {
    try {
        console.log('getProductsList lambda called with', event);
        const productService = new ProductService();
        const products = await productService.getProducts();
        return formatJSONResponse(products);
    } catch (e) {
        return formatJSONResponse({ message: "Failed to fetch products" }, 500);
    }
};

export { getProductsList };