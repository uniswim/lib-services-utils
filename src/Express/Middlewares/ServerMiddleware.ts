import * as Express from "express"
import * as Helmet from "helmet"
import * as cookieParser  from "cookie-parser";
import * as BodyParser from "body-parser"

import LogHttpRequest from "./RequestHandler/LogHttpRequest"
import LogErrors from "./RequestHandler/LogErrors"
import ClientErrorHandler from "./RequestHandler/ClientErrorHandler"
import ErrorHandler from "./RequestHandler/ErrorHandler"
import { Logger } from "winston";

type serverMiddlewareProps = {
    app: Express.Express
    cookie?: {
        active: boolean
        secret_key?: string
    }
    cors?: {
        active: boolean
    }
    httpLogging?: Logger
    errorLogging?: Logger
}

const applyMiddleware = (props: serverMiddlewareProps) => {

    props.app.use(BodyParser.json());
    props.app.use(BodyParser.urlencoded({ extended: false }));

    // -- cookies
    if(props.cookie && props.cookie.active && props.cookie.secret_key)
        props.app.use(cookieParser(props.cookie.secret_key));

    // -- express logging
    if(props.httpLogging)
        props.app.use(LogHttpRequest({ logger: props.httpLogging }))

    // -- securite des entetes
    props.app.use(Helmet())
    props.app.disable("x-powered-by");

    // -- allow cors
    if(props.cors && props.cors.active)
        props.app.use((req, res, next) => {
            let _origin = req.get("Origin");
            res.header("Access-Control-Allow-Origin", _origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });

    // -- express errors
    if(props.errorLogging) props.app.use(LogErrors({ logger: props.errorLogging }));
    props.app.use(ClientErrorHandler);
    props.app.use(ErrorHandler);
    
}


export default { applyMiddleware }