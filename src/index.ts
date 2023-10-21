import express from 'express';
import bodyParser from 'body-parser';

import packagesRoutes from './routes/packages';

const PORT = 3000;

// Create an Express application.
const app = express();

// Use body parser middleware to parse the request body.
// Does not parse all kinds of bodies like files, JSON, etc. 
// app.use(bodyParser.urlencoded({ extended: false }));   // { extended: false } -> Warning: body-parser deprecated undefined extended: provide extended option

// Add packagesRoutes as middleware.
app.use(packagesRoutes);

// Listen on port 3000.
app.listen(PORT);