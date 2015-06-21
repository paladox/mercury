/// <reference path="../../typings/hapi/hapi.d.ts" />
var localSettings = require('../../config/localSettings');
var Logger = require('./Logger');
var Comscore;
(function (Comscore) {
    function getC7Value(vertical) {
        return 'wikiacsid_' + vertical.toLowerCase();
    }
    function getC7ParamAndValue(requestUrl, c7Value) {
        var paramAndValue = requestUrl +
            (requestUrl.indexOf('?') !== -1 ? '&' : '?') +
            localSettings.tracking.comscore.keyword +
            '=' +
            c7Value;
        return encodeURIComponent(paramAndValue);
    }
    function handleResponse(tracking, vertical, request) {
        tracking.comscore.c7 = getC7ParamAndValue('http://' + request.headers.host + '/' + request.url.path, getC7Value(vertical));
        tracking.comscore.c7Value = getC7Value(vertical);
    }
    Comscore.handleResponse = handleResponse;
})(Comscore || (Comscore = {}));
function handleResponse(result, request) {
    var tracking = localSettings.tracking, vertical;
    try {
        vertical = result.article.adsContext.targeting.wikiVertical;
    }
    catch (error) {
        Logger.error('No vertical set for response');
        vertical = '';
    }
    Comscore.handleResponse(tracking, vertical, request);
    // export tracking code to layout and front end code
    result.tracking = tracking;
}
exports.handleResponse = handleResponse;
