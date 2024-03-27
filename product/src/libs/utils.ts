import * as _ from "lodash";
export const mergeById = (products = [], stocks = []) =>
    products.map(product => ({
        ..._.omit(stocks.find((stock) => (stock.product_id === product.id) && stock), 'product_id'),
        ...product
    }));