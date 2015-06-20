/// <reference path="../../../typings/hapi/hapi.d.ts" />
function logout(request, reply) {
    request.auth.session.clear();
    reply.unstate('access_token');
    reply.unstate('wikicitiesUserID');
    reply.redirect('/');
}
module.exports = logout;
