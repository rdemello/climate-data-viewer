import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './lib/router.mjs';

const app = express();
const { PORT = 3002 } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }),
);

// Serve API requests from the router
app.use('/api', apiRouter);

// Serve app production bundle
app.use(express.static(path.join(__dirname, 'dist')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Start server
app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`),
);
