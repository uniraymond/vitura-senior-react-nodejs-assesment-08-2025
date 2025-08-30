import { createApp } from './app';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
    try {
        const app = await createApp();

        const server = app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
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