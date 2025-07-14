// 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter');
const todoRoutes  = require("./Routes/todoRoutes.js");

require('dotenv').config();
require('./Models/db');    // Make sure this connects to DB
require('./Models/User');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
// app.use('/products', ProductRouter);
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
