

/**
* @description This module is an alias for whatever script loader implementation
* we are using. Use this stub to normalize/expose the features available to Wikia
* developers and also to allow for swapping implementations in the future.
*/
var Mercury;
(function (Mercury) {
    var Utils;
    (function (Utils) {
        function load() {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            return $script.apply(null, params);
        }
        Utils.load = load;
    })(Utils = Mercury.Utils || (Mercury.Utils = {}));
})(Mercury || (Mercury = {}));
