export default class Logger {
    static info(message?: any, ...optionalParams: any[]): void {
        console.info(`${new Date().toISOString()} : ${message}`, ...optionalParams);
    }

    static infoTag(tag : String, message?: any, ...optionalParams: any[]): void {
        console.info(`${new Date().toISOString()} ${tag} : ${message}`, ...optionalParams);
    }

    static error(message?: any, ...optionalParams: any[]): void {
        console.error(`${new Date().toISOString()} : ${message}`, ...optionalParams);
    }

    static errorTag(tag : String, message?: any, ...optionalParams: any[]): void {
        console.error(`${new Date().toISOString()} ${tag}  : ${message}`, ...optionalParams);
    }
}
