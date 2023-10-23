// import fs from 'fs';
// import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
// import helmet from 'helmet';
// import compression from 'compression';
// import morgan from 'morgan';
// import cors from 'cors';

import packagesRoutes from './routes/packages';

const port = process.env.PORT || 3000;

// Create an Express application.
const app = express();

// To protect the app against vulnerabilities.
// app.use(helmet());

// To compress HTTP responses back to the client, improve load time.
// app.use(compression());

// Create write stream for appending logs to access.log file.
// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, 'access.log'),
//   { flags: 'a' }
// );
// Append logs to access.log file.
// app.use(morgan('combined', { stream: accessLogStream }));

// Enable all CORS Requests for now - can be configured.
// app.use(cors());

// Use body parser middleware to parse the request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add packagesRoutes as middleware.
app.use(packagesRoutes);

// Start the server and listen on port.
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
