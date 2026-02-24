const express = require("express");
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const basicAuth = require("express-basic-auth");

//routers 
const { Sale } = require("./sale.js");
const {router: salesRouter} = require("./routers/sales.js")
const {router: creditSales} = require("./routers/credit-sales.js")
const {router: userRouter} = require("./routers/users.js")

// middleware
const {simulateSalesAgent} = require("./middleware/index.js")
const {errorHandler} = require("./middleware/erro.js")


const sale = new Sale();
const app = express();


// swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "KGL REST API DOCUMENTATION",
    version: "1.0.0",
    description: "REST API documentation for KGL REST API for the frontend application",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

// options for the swagger-jdocs
const options = {
  swaggerDefinition, // path to the API docs
  apis: ["./routers/*.js"],
};

// configure basic authentication for swagger ui
const swaggerAuth = basicAuth({
  users: { "kevin": "SuperSecretPassword123" },
  challenge: true,
  realm: "Swagger documentation"
});

// generate swagger specification
const swaggerSpec = swaggerJSDoc(options);

// serve swagger ui
app.use("/api-docs", swaggerAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// middleware
app.use(express.json());
app.use(simulateSalesAgent);
// Allow all origins
app.use(cors());


// get request to the homepage
app.get("/", (req, res) => {
  res.send('hello world from from Kevin');
});


app.use("/sales",salesRouter);
app.use("/credit-sales", creditSales);
app.use("/users", userRouter)

app.use(errorHandler);

app.listen(3000, (err) => {
  if (err) {
    console.log('Errror');
  } else {
    console.log('Server is successfully running on port 3000');
  }
});