




const ArticleEditRoute = Ember.Route.extend(FullPageMixin, {
	/**
	 * @param {*} params
	 * @returns {Ember.RSVP.Promise}
	 */
	model(params) {
		return ArticleEditModel.load(params.title, params.sectionIndex);
	},

	/**
	 * @returns {void}
	 */
	renderTemplate() {
		this.render('article-edit', {
			controller: 'articleEdit'
		});
	},

	actions: {
		/**
		 * @returns {boolean}
		 */
		error() {
			this.controllerFor('application').addAlert({
				message: i18n.t('app.edit-load-error'),
				type: 'alert'
			});

			track({
				action: trackActions.impression,
				category: 'sectioneditor',
				label: 'edit-load-error'
			});

			return true;
		}
	}
});


