/// <reference path='../../../../typings/ember/ember.d.ts' />
/// <reference path='../app.ts' />
/// <reference path="../mixins/LanguagesMixin.ts" />

App.ArticleContributionComponent = Em.Component.extend(App.LanguagesMixin, {
	classNames: ['contribution-container'],
	classNameBindings: ['addPhotoIconVisible::no-photo'],
	layoutName: 'components/article-contribution',
	section: null,
	sectionId: null,
	title: null,
	uploadFeatureEnabled: null,

	actions: {
		/**
		 * Activate section editor
		 * If login is required to edit, redirect to login page
		 *
		 * @returns {void}
		 */
		edit(): void {
			var section = this.get('section');

			var editAllowed = this.get('editAllowed');

			console.log('ArticleContributionComponent edit');
			console.log(`editAllowed: ${editAllowed}`);

			if (this.get('editAllowed')) {
				M.track({
					action: M.trackActions.click,
					category: 'sectioneditor',
					label: 'edit',
					value: section
				});
				this.sendAction('edit', this.get('title'), section);
				console.log('sent edit action');
			} else {
				console.log('redirecting to login for edit');
				this.redirectToLogin('edit-section-no-auth');
			}
		},

		/**
		 * Go to add photo
		 * If login is required to add photo, redirect to login page
		 *
		 * @returns {void}
		 */
		addPhoto(): void {
			var addPhotoAllowed = this.get('addPhotoAllowed');

			console.log('ArticleContributionComponent addPhoto');
			console.log(`addPhotoAllowed: ${addPhotoAllowed}`);

			if (this.get('addPhotoAllowed')) {
				M.track({
					action: M.trackActions.click,
					category: 'sectioneditor',
					label: 'add-photo',
					value: this.get('section')
				});
				var photoData = this.$('.file-upload-input')[0].files[0];
				this.sendAction('addPhoto', this.get('title'), this.get('section'), photoData);
				console.log('sent add photo action');
			} else {
				console.log('redirecting to login for add photo');
				this.redirectToLogin('add-photo-no-auth');
			}
		},
	},

	openLocation(href: string) {
		window.location.href = href;
	},

	/**
	 * Redirect the user to login page
	 * @param trackingLabel {string} Label to use for tracking of event
	 */
	redirectToLogin(trackingLabel: string) {
		console.log('redirectToLogin');

		var href = `/join?redirect=${encodeURIComponent(window.location.href)}`,
			sectionId = this.get('sectionId');

		if (sectionId) {
			href += encodeURIComponent('#' + sectionId);
		}
		href += this.getUselangParam();

		M.track({
			action: M.trackActions.click,
			category: 'sectioneditor',
			label: trackingLabel,
			value: this.get('section')
		});

		this.openLocation(href);
	},
});
