const fs = require("fs");
const ini = require("ini");
require("colors")
const colors = require("colors/safe");

class Logger {
    constructor(type) {
        this.type = type.toUpperCase();
        this.validLogLevels = { 
            error: 'red', 
            warn: 'yellow', 
            info: 'blue', 
            verbose: 'cyan', 
            debug: 'white', 
            silly: 'rainbow'
        }
        if (!type) {
            throw new TypeError("No type supplied to Logger class");
        }
        this.logBase = ini.parse(fs.readFileSync("./lib/logbase.ini", "utf-8"));
        if (!fs.readdirSync("./").includes("logs")) {
            fs.mkdirSync("./logs");
        }
        if (!fs.readdirSync("./logs").includes(type)) {
            fs.mkdirSync(`./logs/${type}`);
        }
        this.logFilePath = `./logs/${type}/${type}_${new Date().getTime()}.log`;
        fs.appendFileSync(this.logFilePath, "LOG_FILE_BEGIN\n");
    }
    log(code, options={}) {
        if (!this.logBase[code]) {
            this.log("LOG001", {logCode: code});
        } else {
            // let standardLog = `[${this.type}][${this.logBase[code].LogLevel.toUpperCase()}][${new Date().getTime()}] `;
            let logLevel = this.logBase[code].LogLevel;
            if (!this.validLogLevels[logLevel]) {
                this.log("LOG002", {logCode: code, logLevel: logLevel})
            } else {
                let errorType = colors[this.validLogLevels[logLevel]](logLevel.toUpperCase());
                var logText = this.logBase[code].LogText;
                for (let option in options) {
                    logText = logText.replace(`{${option}}`, options[option]);
                }
                let consoleLog = `[${this.type.cyan}][${new Date().getTime().toString().grey}] ${errorType} ${logText}`;
                let standardLog = `[${this.type}][${new Date().getTime().toString()}] ${logLevel.toUpperCase()} ${logText}\n`;
                fs.appendFileSync(this.logFilePath, standardLog);
                console.log(consoleLog);
            }
        }
    }
}

module.exports = Logger;