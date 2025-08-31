import { createApp } from './app';
import dotenv from 'dotenv';
import { config } from './config';

dotenv.config();

const startServer = async () => {
    try {
        const app = await createApp();

        const server = app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });

        const shutdown = async (signal: string) => {
            console.log(`Received ${signal}, shutting down gracefully...`);
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            })
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

    } catch (error) {
        console.error('Failed to start server: ', error);
        process.exit(1);
    }
};

startServer();