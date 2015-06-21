/// <reference path="../../../typings/node/node.d.ts" />
var path = require('path');
var assetsHandler = {
    directory: {
        path: path.join(__dirname, '../../../front'),
        listing: false,
        index: false,
        lookupCompressed: true
    }
};
module.exports = assetsHandler;
