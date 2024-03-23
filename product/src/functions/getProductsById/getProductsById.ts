import { ProductService } from '@libs/productService';
import { formatJSONResponse } from '@libs/api-gateway';

export const getProductsById = async (event) => {
    const productService = new ProductService();
    const product = await productService.getProduct(event.pathParameters?.productId);
    return product ? formatJSONResponse(product) : formatJSONResponse({message: "Product not found"}, 404);
  };