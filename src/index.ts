import express from 'express';
import bodyParser from 'body-parser';

import packagesRoutes from './routes/packages';

const port = process.env.PORT || 3000;

// Create an Express application.
const app = express();

// Use body parser middleware to parse the request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add packagesRoutes as middleware.
app.use(packagesRoutes);

// Start the server and listen on port.
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
