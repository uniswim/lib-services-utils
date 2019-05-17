import * as winston from "winston";

export type LoggerItem = winston.Logger

class LoggerManager {

    // SINGLETON
    static instance:LoggerManager;
    static getInstance = () => {
        if(LoggerManager.instance === null){
            LoggerManager.instance = new LoggerManager();
        }
        return LoggerManager.instance;
    }

    private _loggers: {[key:string]: winston.Logger} = {}

    createLogger(name: string, options?: winston.LoggerOptions): winston.Logger{
        
        let _formatSource = winston.format.combine(
            winston.format.label({ label: name }),
        )
        
        let _options: winston.LoggerOptions = { 
            ...options,
            format: _formatSource
        };
        if(options && options.format) _options.format = winston.format.combine(_formatSource, options.format);

        this._loggers[name] = winston.createLogger(_options);
        return this.logger(name);
    }

    logger(name: string): winston.Logger {
        return this._loggers[name];
    }

    enable(name: string){
        let _logger = this.logger(name);
        if(_logger) _logger.silent = false;
    }

    disable(name: string){
        let _logger = this.logger(name);
        if(_logger) _logger.silent = true;
    }
}

export default LoggerManager.getInstance();