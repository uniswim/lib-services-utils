import consoleTransport from "./WinstonLoggerManager/Transports/consoleTransport";

export { default as LoggerManager } from "./WinstonLoggerManager";
export const LoggerTransports = {
    consoleTransport: consoleTransport
}

