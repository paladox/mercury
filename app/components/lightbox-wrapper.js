import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lightbox-wrapper'],
	classNameBindings: ['status'],
	// This is needed for keyDown event to work
	attributeBindings: ['tabindex'],
	tabindex: 0,
	footerExpanded: false,
	footerHidden: false,
	headerHidden: false,
	header: null,
	footer: null,
	type: null,
	model: null,

	status: Ember.computed('type', function () {
		return (this.get('type')) ? 'open' : 'hidden';
	}),

	lightboxComponent: Ember.computed('type', function () {
		var type = this.get('type');

		return type ? 'lightbox-' + type : null;
	}),
	click (event) {
		var $target = this.$(event.target);

		if ($target.is('.lightbox-footer')) {
			this.send('toggleFooter');
		} else if ($target.is('.lightbox-close-wrapper')) {
			this.send('close');
		} else {
			this.send('toggleUI');
		}
	},

	keyDown (event) {
		if (event.keyCode === 27) {
			this.send('close');
		}
	},

	actions: {
		close () {
			this.setProperties({
				footer: null,
				header: null,
				footerExpanded: false
			});

			this.sendAction('closeLightbox');
		},
		setFooter (footer) {
			this.set('footer', footer);
		},
		setHeader (header) {
			this.set('header', header);
		},
		setQueryParam (name, value) {
			this.sendAction('setQueryParam', name, value);
		},
		toggleFooter () {
			this.toggleProperty('footerExpanded');
		},
		toggleUI () {
			this.toggleProperty('footerHidden');
			this.toggleProperty('headerHidden');
		}
	},

	didInsertElement () {
		// This is needed for keyDown event to work
		this.$().focus();
	}
});
