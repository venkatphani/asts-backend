import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes/Routes";
import * as cors from "cors";
import * as helmet from "helmet";
import { validationMiddleware } from "./validations"

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    const corsOptions = {
        origin: "*",
        credentials: false,
    };
    app.use(cors(corsOptions)); // middleware to enables cors
    app.use(helmet()); // middleware which adds http headers
    // app.use(compression());

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, validationMiddleware(route.validationInputs, route.validationKey), (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(2020);

    console.log("Express application is up and running on port 2020");

}).catch(error => console.log("TypeORM connection error: ", error));