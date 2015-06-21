

var Mercury;
(function (Mercury) {
    var Utils;
    (function (Utils) {
        var String;
        (function (String) {
            /**
             * We need to support links like:
             * /wiki/Rachel Berry
             * /wiki/Rachel  Berry
             * /wiki/Rachel__Berry
             *
             * but we want them to be displayed normalized in URL bar
             */
            function sanitize(title) {
                if (title === void 0) { title = ''; }
                return title
                    .replace(/\s/g, '_')
                    .replace(/_+/g, '_');
            }
            String.sanitize = sanitize;
            function normalize(str) {
                if (str === void 0) { str = ''; }
                return str
                    .replace(/_/g, ' ')
                    .replace(/\s+/g, ' ');
            }
            String.normalize = normalize;
        })(String = Utils.String || (Utils.String = {}));
    })(Utils = Mercury.Utils || (Mercury.Utils = {}));
})(Mercury || (Mercury = {}));
