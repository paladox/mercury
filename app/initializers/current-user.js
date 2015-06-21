import currentUser from '../models/current-user';

export function initialize(container, application) {
	application.register('currentUser:main', currentUser);
	application.inject('controller', 'currentUser', 'currentUser:main');
}

export default {
	name: 'current-user',
	initialize: initialize
};
