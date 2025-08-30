import express from 'express';
import {loadProducts} from './utils/loadProducts';

export const createApp = async () => {
    const app = express();

    try {
        const products = await loadProducts();
        console.log('products: ', products.length);
    } catch (error) {
        console.error('Failed to load products');
        throw error;
    }

    app.use(express.json());
    // app.use('/products', products);

    return app;
}