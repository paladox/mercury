/// <reference path="../../typings/hapi/hapi.d.ts" />
/**
 * Caching related routines
 */
var Caching;
(function (Caching) {
    // Caching policy
    (function (Policy) {
        Policy[Policy["Private"] = 0] = "Private";
        Policy[Policy["Public"] = 1] = "Public";
    })(Caching.Policy || (Caching.Policy = {}));
    var Policy = Caching.Policy;
    // Caching expire intervals
    Caching.Interval = {
        // 30 days in seconds
        long: 2.592e+6,
        // 24h in seconds
        standard: 8.64e+4,
        // 3h in seconds
        short: 1.08e+4,
        // disabled
        disabled: 0,
        // default
        default: -1
    };
    /**
     * Sets proper headers to the response object
     *
     * Ported from https://github.com/Wikia/app/blob/dev/includes/wikia/nirvana/WikiaResponse.class.php#L309
     *
     * @param response
     * @param cachingSettings
     */
    function setResponseCaching(response, cachingSettings) {
        if (cachingSettings && cachingSettings.enabled && response.statusCode === 200) {
            if (cachingSettings.browserTTL === Caching.Interval.default) {
                cachingSettings.browserTTL = cachingSettings.varnishTTL;
            }
            if (cachingSettings.cachingPolicy === Policy.Public) {
                // Varnish caches for 5 seconds when Apache sends Cache-Control: public, s-maxage=0
                // perform this logic here
                if (cachingSettings.varnishTTL === Caching.Interval.disabled) {
                    cachingSettings.varnishTTL = 5;
                }
                response.header('Cache-Control', 's-maxage=' + cachingSettings.varnishTTL);
            }
            else if (cachingSettings.cachingPolicy === Policy.Private) {
                response.header('Cache-Control', 'private, s-maxage=' + cachingSettings.varnishTTL);
            }
            if (cachingSettings.browserTTL > 0) {
                response.header('X-Pass-Cache-Control', policyString(cachingSettings.cachingPolicy) + ', max-age=' +
                    cachingSettings.browserTTL);
            }
        }
    }
    Caching.setResponseCaching = setResponseCaching;
    /**
     * Returns string representation of the caching policy constant
     * @param policy
     * @returns {string}
     */
    function policyString(policy) {
        return Policy[policy].toLowerCase();
    }
    Caching.policyString = policyString;
    /**
     * Disables use of cache in the response
     * @param response
     */
    function disableCache(response) {
        response.header('Cache-Control', 'private, s-maxage=0, max-age=0, must-revalidate');
    }
    Caching.disableCache = disableCache;
})(Caching || (Caching = {}));
module.exports = Caching;
