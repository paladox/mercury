import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['wikia-map'],
	url: null,
	title: null,
	imageSrc: null,
	id: null,
	templateName: 'components/wikia-map',
	caption: Ember.computed.alias('title'),

	didInsertElement () {
		//handle click with jquery because the 'normal' way to handle events doesn't work.
		this.$().click(() => {
			var url = this.get('url'),
				id = this.get('id'),
				title = this.get('title');

			if (url) {
				Ember.Logger.debug('Handling map with id:', id, 'and title:', title);

				M.track({
					action: M.trackActions.click,
					category: 'map'
				});

				this.sendAction('click', 'map', {
					title: title,
					url: url,
					id: id
				});
			}
		});
	}
});
