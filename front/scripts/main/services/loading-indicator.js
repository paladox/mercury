export default Ember.Service.extend({
	isActive: false,

	activate() {
		this.set('isActive', true);
	},

	deactivate() {
		this.set('isActive', false);
	},
});
