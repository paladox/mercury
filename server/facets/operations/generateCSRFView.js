/// <reference path='../../../typings/hapi/hapi.d.ts' />
function generateCSRFView(request, reply) {
    reply.view('breadcrumb', null, { layout: 'empty' });
}
module.exports = generateCSRFView;
