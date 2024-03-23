import { ProductService } from '@libs/productService';
import { formatJSONResponse } from '@libs/api-gateway';

const getProductsList = async () => {
    const productService = new ProductService();
    const products = await productService.getProducts();
    return formatJSONResponse(products);
};

export { getProductsList };