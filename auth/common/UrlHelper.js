var UrlHelper = (function () {
    function UrlHelper() {
    }
    UrlHelper.prototype.urlEncode = function (object) {
        return Object.keys(object).map(function (key) {
            return (encodeURIComponent(key) + "=" + encodeURIComponent(object[key]));
        }).join('&');
    };
    return UrlHelper;
})();
