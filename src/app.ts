import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import httpStatus from "http-status";
import passport from "passport";
import config from "./config/config.js";
import morgan from "./config/morgan.js";
import { jwtStrategy } from "./config/passport.js";
import { errorConverter, errorHandler } from "./middlewares/error.js";
import { authLimiter } from "./middlewares/rateLimiter.js";
import xss from "./middlewares/xss.js";
import routes from "./routes/v1/index.js";
import ApiError from "./utils/ApiError.js";
import createAdmin from "./script/createadmin.js";
const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Sanitize request data
app.use(xss());

// Gzip compression
app.use(compression());

// fingerprinting lowering
app.disable("x-powered-by");

// Enable cors
app.use(cors());
app.options("*", cors());

// Jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// V1 api routes
app.use("/v1", routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
// app.use(errorHandler);

createAdmin();

export default app;
