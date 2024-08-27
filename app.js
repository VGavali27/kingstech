import express from "express";
import path, { dirname } from "path";

import https from "https";
// const fs = require("fs");
import fs from "fs";
import { fileURLToPath } from 'url';
import viewRoutes from './routes/viewRoutes.mjs';
import apiRoutes from './routes/apiRoutes.mjs'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authMiddleware from "./middleware/authenticate.mjs"

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

var corsOptions = {
    origin: "*"
  };
  
  app.use(cors(corsOptions));
  

// Middleware to set headers for preventing caching
// app.use((req, res, next) => {
//     // Set headers to prevent caching
//     res.setHeader('Cache-Control', 'no-store');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
  
//     // Continue to the next middleware or route handler
//     next();
//   });
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// Apply body-parser middleware before other middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});



// app.use(cors({
//     origin: '*'
// }));

app.use(viewRoutes); // Mount view routes under /
// app.use(userRoutes); // Mount view routes under /
// app.use('/api/users', userRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/post', postRoutes);
// app.use(checkLogin);
app.use('/api', apiRoutes); // Mount API routes under /api

app.use((err, req, res, next) => {
    console.log(err.message);
    res.send("Error. See console");
});

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


https
  .createServer(
    {
      key: fs.readFileSync(
        "../../ssl/keys/d9e89_7249b_af9cc63d978f937697a45d96e2fb4950.key"
      ),
      cert: fs.readFileSync(
        "../../ssl/certs/app_node_enterprisetalk_com_d9e89_7249b_1728814210_9fa4305ce1bbe8e717b70770bf946287.crt"
      ),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });