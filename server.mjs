const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRouter = require('./lib/router.cjs');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const { PORT = 3002 } = process.env;
const app = express();

const swaggerDocument = YAML.load('./api-docs/swagger.yaml');

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }),
);

// Serve Swagger UI with API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
