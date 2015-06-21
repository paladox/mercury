/// <reference path='../../../typings/hapi/hapi.d.ts' />
function redirectToRoot(request, reply) {
    reply.redirect('/');
}
module.exports = redirectToRoot;
