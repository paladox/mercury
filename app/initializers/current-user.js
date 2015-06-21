export function initialize(container, application) {
	application.register('currentUser:main', App.CurrentUser);
	application.inject('controller', 'currentUser', 'currentUser:main');
}

export default {
  name: 'current-user',
	after: 'performanceMonitoring',
  initialize: initialize
};
