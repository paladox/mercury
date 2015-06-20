/// <reference path="../typings/node/node.d.ts" />
/**
 * This is the main server script.
 *
 * This script will boot app.js with the number of workers
 * specified in WORKER_COUNT.
 *
 */
var cluster = require('cluster');
var localSettings = require('../config/localSettings');
var logger = require('./lib/Logger');
/**
 * Is the application stopping
 * @type {boolean}
 */
var isStopping = false;
cluster.setupMaster({
    exec: __dirname + '/app.js'
});
/**
 * Gets the count of active workers
 *
 * @returns {number} Current number of workers
 */
function numWorkers() {
    return Object.keys(cluster.workers).length;
}
/**
 * Forks off the workers unless the server is stopping
 */
function forkNewWorkers() {
    if (!isStopping) {
        for (var i = numWorkers(); i < localSettings.workerCount; i++) {
            cluster.fork();
        }
    }
}
/**
 * Stops a single worker
 * Gives workerDisconnectTimeout seconds after disconnect before `SIGTERM`
 *
 * @param worker
 */
function stopWorker(worker) {
    logger.info('Stopping worker');
    worker.send('shutdown');
    worker.disconnect();
    var killTimer = setTimeout(function () {
        worker.kill();
    }, localSettings.workerDisconnectTimeout);
    worker.on('disconnect', function () {
        logger.info('Worker disconnected');
        clearTimeout(killTimer);
        worker.kill();
    });
    // Ensure we don't stay up just for this setTimeout
    killTimer.unref();
}
/**
 * Stops all the workers at once
 */
function stopAllWorkers() {
    isStopping = true;
    logger.info('Stopping all workers');
    Object.keys(cluster.workers).forEach(function (id) {
        stopWorker(cluster.workers[id]);
    });
}
// A worker has disconnected either because the process was killed
// or we are processing the workersToStop array restarting each process
// In either case, we will fork any workers needed
cluster.on('disconnect', forkNewWorkers);
// Kill all the workers at once
process.on('SIGTERM', stopAllWorkers);
// Fork off the initial workers
forkNewWorkers();
logger.info('Master process booted');
// if run as child
// send up message from workers so we can now that they are up
if (process.send) {
    cluster.on('online', function (worker) {
        worker.on('message', function (message) {
            process.send(message);
        });
    });
}
