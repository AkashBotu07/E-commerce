const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler');
const cors = require('cors');

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);


app.use(cors());
app.options('*', cors()) 
// // app.use(cors({
// //     origin: "*"
// //  }));
//  app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     next();
//  });

//  app.use(cors({
//     origin: 'http://localhost:5500'
//  }));

// Routers
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const sellersRouter = require('./routers/sellers');

// Middleware to parse JSON in the request body - routers
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/sellers', sellersRouter); // Apply sellerPostOnly middleware specifically to the sellersRouter

// Environment variables
require('dotenv/config');
const api = process.env.API_URL;

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce'
})
    .then(() => {
        console.log('Connection successful');
    })
    .catch((err) => {
        console.log("MongoDB error", err);
    });

app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
});




