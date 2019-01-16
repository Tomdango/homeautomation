'use strict';

class MockLogger {
    constructor() {
        this.method = console;
        this.minLogLevel = 6;
        this.logLevels = { 
            emerg: 0, 
            alert: 1, 
            crit: 2, 
            error: 3, 
            warning: 4, 
            notice: 5, 
            info: 6, 
            debug: 7
        };
    };
    log(level, text, args={}) {
        if (typeof this.logLevels[level] === 'undefined') {
            this.log('error', 'Unknown Logging Level', {level: level});
        } else if(this.logLevels[level] <= this.minLogLevel) {
            let argsText = '';
            for (let element in args) {
                argsText += `${element}=${args[element]} `;
            };
            this.method.log(`[${level.toUpperCase()}] ${text} | ${argsText}`);
        }
        // this.method.log(level);
    }
}

module.exports = new MockLogger();