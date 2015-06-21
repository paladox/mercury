function wrapResult(err, result) {
    result = result || {};
    result.status = err ? (err.code || err.exception.code || err.statusCode || 500) : 200;
    result.message = err ? err : 'success';
    return result;
}
module.exports = wrapResult;
