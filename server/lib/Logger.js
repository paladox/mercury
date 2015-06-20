/// <reference path="../../typings/bunyan/bunyan.d.ts" />
/// <reference path="../../typings/bunyan-prettystream/bunyan-prettystream.d.ts" />
/// <reference path="../../typings/bunyan-syslog/bunyan-syslog.d.ts" />
var bunyan = require('bunyan');
var localSettings = require('../../config/localSettings');
/**
 * Logger interface
 */
var Logger;
(function (Logger) {
    var availableTargets = {
        default: createDefaultLogStream,
        syslog: createSysLogStream,
        console: createConsoleStream
    };
    /**
     * Creates the default log stream settings
     *
     * @param minLogLevel
     * @returns {{stream: WritableStream, level: string}}
     */
    function createDefaultLogStream(minLogLevel) {
        if (minLogLevel === void 0) { minLogLevel = 'info'; }
        return {
            level: minLogLevel,
            stream: process.stderr
        };
    }
    /**
     * Creates the console log settings
     *
     * @param minLogLevel
     * @returns {{level: string, stream: exports}}
     */
    function createConsoleStream(minLogLevel) {
        var PrettyStream = require('bunyan-prettystream'), prettyStdOut = new PrettyStream();
        prettyStdOut.pipe(process.stdout);
        return {
            level: minLogLevel,
            stream: prettyStdOut
        };
    }
    /**
     * Create the SysLog stream settings
     *
     * @param minLogLevel
     * @returns {{level: string, type: string, stream: any}}
     */
    function createSysLogStream(minLogLevel) {
        var bsyslog = require('bunyan-syslog');
        return {
            level: minLogLevel,
            type: 'raw',
            stream: bsyslog.createBunyanStream({
                facility: bsyslog.local0,
                type: 'sys'
            })
        };
    }
    /**
     * Create logger
     *
     * @param loggerConfig
     * @returns {BunyanLogger}
     */
    function createLogger(loggerConfig) {
        var streams = [];
        Object.keys(loggerConfig).forEach(function (loggerType) {
            if (!availableTargets.hasOwnProperty(loggerType)) {
                throw new Error('Unknown logger type ' + loggerType);
            }
            streams.push(availableTargets[loggerType](loggerConfig[loggerType]));
        });
        if (streams.length === 0) {
            streams.push(createDefaultLogStream());
        }
        return bunyan.createLogger({
            name: 'mercury',
            streams: streams
        });
    }
    Logger.createLogger = createLogger;
})(Logger || (Logger = {}));
var logger = Logger.createLogger(localSettings.loggers);
module.exports = logger;
