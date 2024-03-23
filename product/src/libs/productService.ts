import products from './products';

export type Product = {
    count: number;
    description: string;
    id: string;
    price: number;
    title: string;
}

export class ProductService {
    async getProducts(): Promise<Product[]> {
        return Promise.resolve(products);
    }

    async getProduct(productId: string): Promise<Product|null> {
        const product = products.find(product => product.id === productId);
        return Promise.resolve(product || null);
    }
}