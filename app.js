const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const ApiError = require("./app/api-error");
//const routes = require("./app/routes");

const app = express();

app.use(cors({ withCredentials: true, origin: ['http://localhost:3001', 'http://localhost:9000' ] }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes(app);

const ProductRouter = require("./app/routes/product.route");
const UserRouter = require('./app/routes/user.route');
const OrderRouter = require('./app/routes/order.route');

app.use("/product",ProductRouter);
app.use("/user",UserRouter);
app.use("/order",OrderRouter);

app.use((req,res,next) => {
    return next(new ApiError(404,"Resource not found"));
});

app.use((error,req,res,next) => {
    console.log(error);
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

app.get("/",(req,res) =>{
    res.json({ message:"Welcome to contact book application."});
});

module.exports = app;






