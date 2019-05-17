import { ErrorRequestHandler } from "express";

type options = { logger: { error: any } }
type LogErrorFn = (options: options) => ErrorRequestHandler

const LogError: LogErrorFn = (opts) => (err, req, res, next) => {
    opts.logger.error(err.stack);
    next(err);
}

export default LogError