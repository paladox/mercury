/**
 * Wikia (Japan) Homepage
 *
 * @author Per Johan Groland <pgroland@wikia-inc.com>
 */

function logout(request, reply) {
	//reply.unstate('access_token');
	//reply.redirect('/');

	var locale = util.getUserLocale(request),
		data = {
			title: 'ウィキア・ジャパン',
			carousel: util.getLocalizedHubData(hubConfig, locale),
			popular: util.preprocessPopularData(popularItemConfig)
		};

	util.renderWithGlobalData(request, reply, data, 'index');
}

module.exports = logout;
