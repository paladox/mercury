/**
 * Wikia (Japan) Homepage
 *
 * @author Per Johan Groland <pgroland@wikia-inc.com>
 */

function logout(request, reply) {
	reply.unstate('access_token'); 
	reply.redirect('http://ja.wikia.com');
}

module.exports = logout;
