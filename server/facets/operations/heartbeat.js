/// <reference path="../../../typings/hapi/hapi.d.ts" />
function heartbeat(request, reply) {
    var memoryUsage = process.memoryUsage();
    reply('Server status is: OK')
        .header('X-Memory', String(memoryUsage.rss))
        .header('X-Uptime', String(~~process.uptime()))
        .code(200);
}
module.exports = heartbeat;
