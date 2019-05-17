import * as morgan from "morgan"
import { RequestHandler } from "express";

type options = { logger: { info: any } }
type LogHttpFn = (options: options) => RequestHandler

const LogHttp: LogHttpFn = (opts) => morgan("dev", {
    stream: {
        write: (stream) => {
            if(typeof stream == "string") stream = stream.replace("\n", "");
            opts.logger.info(stream);
        }
    }
})

export default LogHttp;