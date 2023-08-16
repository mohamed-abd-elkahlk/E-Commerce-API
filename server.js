const express = require("express");

const app = express();

const dotenv = require("dotenv");

const morgan = require("morgan");

const passport = require("passport");

const cookieParser = require("cookie-parser");

const compression = require("compression");

const cors = require("cors");
const dbConnection = require("./config/db.connection");
const ApiError = require("./utils/ApiError.util");
const globalError = require("./middleware/Error.middleware");
const strategy = require("./config/passport");
const mountRoutes = require("./routes");

// init our enviroment varibals
dotenv.config({
  path: "./config/.env/config.env",
});

// connct to our DataBase
dbConnection();

// Enable other domains to access your application
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

// mildllwere
app.use(express.json());
passport.use(strategy);
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// this middlwere used to log out the http requst
app.use(morgan("dev"));

// routes
mountRoutes(app);
// handle all unreched routes error
app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 404));
});

// global error handleing

// TODO: make error for prodction mode
app.use(globalError);
// listing on port 8000
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
// handele error outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message} `);
  server.close(() => {
    console.error(`Shtuing down....`);
    process.exit(1);
  });
});
