/**
 * Wikia (Japan) Homepage
 *
 * @author Per Johan Groland <pgroland@wikia-inc.com>
 */

var Promise = require('bluebird'),
	request = require('request'),
	localSettings = require('../config/localSettings').localSettings;

function Auth() {
	this.baseUrl = localSettings.helios.host;
	this.servicesUrl = localSettings.servicesUrl;
	this.mediaWikiUrl = "";
}

function requestWrapper(url) {
	var deferred = Promise.defer();

	console.log("requestWrapper request");
	console.log(url);

	request.get(url, function (err, response, body) {
		if (err) {
			console.log("requestWrapper response ERROR");
			console.log(err);

			deferred.reject(err);
		} else {
			try {
				var json = JSON.parse(body);

				if (json.error) {
					console.log("requestWrapper response");
					console.log(json);

					deferred.reject(json);
				} else {
					console.log("requestWrapper response");
					console.log(json);

					deferred.resolve(json);
				}
			}
			catch (e) {
				deferred.resolve(body);
			}
		}
	});

	return deferred.promise;
}

Auth.prototype.login = function (username, password) {
	var url = this.baseUrl + 'token?' +
		'username=' + username + '&' +
		'password=' + password;

	return requestWrapper(url);
};

Auth.prototype.info = function (token) {
	var url = this.baseUrl + 'info?' +
		'code=' + token;

	return requestWrapper(url);
};

Auth.prototype.validateUser = function (username) {
	var url = this.baseUrl + 'username/validation?' +
		'username=' + username;

	return requestWrapper(url);
};

Auth.prototype.getUserName = function (heliosInfoResponse) {
	var url = this.servicesUrl + 'user-attribute/user/' +
		heliosInfoResponse.user_id  + '/attr/username'; // jshint ignore:line

	console.log("getUserName");
	console.log(heliosInfoResponse);
	console.log(url);

	return requestWrapper(url);
};

module.exports = Auth;
