import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['main-page-modules'],
	didInsertElement: function () {
		M.track({
			action: M.trackActions.impression,
			category: 'modular-main-page',
			label: 'main-page-impression'
		});
	}
});
