require("dotenv").config()
const express = require("express");
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const basicAuth = require("express-basic-auth");

// connect to mongodb
const {connectDbHashPassword} = require("./mongodb-server.js")
connectDbHashPassword();

//routers 
const { Sale } = require("./sale.js");
const {router: salesRouter} = require("./routers/sales.js")
const {router: creditSales} = require("./routers/credit-sales.js")
const {router: userRouter} = require("./routers/users.js")
const {router: adminRouter } = require("./routers/admin.js")
const {router: authRouter } = require("./routers/auth.js")
const {authMiddleware} = require("./middleware/authMiddleware.js")
const {protectedRouter} = require("./middleware/protectedRouter.js")

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



// Allow all origins
app.use(cors());


app.use(express.json());

// middleware
app.use(simulateSalesAgent);




// get request to the homepage
app.get("/", (req, res) => {
  res.send('hello world from from Kevin');
});

app.post("/login", (req, res) => {

})


protectedRouter.use("/sales",salesRouter);
protectedRouter.use("/credit-sales", creditSales);
protectedRouter.use("/users", userRouter);
protectedRouter.use("/admin", adminRouter);

app.use("/auth", authRouter);
app.use("/", authMiddleware, protectedRouter)

app.use(errorHandler);

const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
  if (err) {
    console.log('Errror');
  } else {
    console.log(`Server is successfully running on port: ${ PORT}`);
  }
});