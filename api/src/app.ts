import express from 'express';
import { loadProducts } from './utils/loadProducts';
import productRouter from './routes/products';
import cors from 'cors';
import { logHandler } from './middleware/logHandler';
import { errorHandler } from './middleware/errorHandler';

export const createApp = async () => {
    const app = express();

    const allowedOrigins = [
        `http://localhost:${process.env.CLIENTPORT}`,
        `http://127.0.0.1:${process.env.CLIENTPORT}`
    ];

    try {
        const products = await loadProducts();
        console.log('products: ', products.length);
    } catch (error) {
        console.error('Failed to load products');
        throw error;
    }

    app.use(cors({
        origin(origin, cb) {
            if (!origin) {
                return cb(null, true);
            
            }

            if (allowedOrigins.includes(origin)){
                return cb(null, true);
            }

            return cb(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,
        maxAge: 86400
    }));

    app.use(express.json());
    app.use(logHandler);
    app.use('/products', productRouter);
    app.use(errorHandler);

    return app;
}