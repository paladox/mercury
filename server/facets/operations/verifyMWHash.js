var localSettings = require('../../../config/localSettings');
var crypto = require('crypto');
function verifyMWHash(parserOutput, mwHash) {
    var hmac = crypto.createHmac('sha1', localSettings.mwPreviewSalt || ''), computedHash = hmac.update(parserOutput).digest('hex');
    return (computedHash === mwHash);
}
module.exports = verifyMWHash;
