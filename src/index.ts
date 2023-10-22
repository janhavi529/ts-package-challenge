import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import packagesRoutes from "./routes/packages";

const port = process.env.PORT || 3000;

// Create an Express application.
const app = express();

// Enable all CORS Requests for now - can be configured.
app.use(cors());

// Use body parser middleware to parse the request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add packagesRoutes as middleware.
app.use(packagesRoutes);

// Listen on port 3000.
app.listen(port);