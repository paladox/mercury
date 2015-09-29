/// <reference path="../app.ts" />
'use strict';

App.SideNavComponent = Em.Component.extend({
	tagName: 'nav',
	classNames: ['side-nav'],
	classNameBindings: ['shouldBeVisible:slide-into-view:collapsed'],

	isInSearchMode: false,
	searchQuery: '',
	searchPlaceholderLabel: Em.computed(function (): string {
		return i18n.t('app.search-label');
	}),

	actions: {
		clearSearch: function (): void {
			this.set('searchQuery', '');
		},

		collapse: function (): void {
			this.sendAction('toggleVisibility', false);
			this.send('searchCancel');
		},

		expand: function (): void {
			this.sendAction('toggleVisibility', true);
		},

		searchCancel: function (): void {
			this.set('isInSearchMode', false);
			this.send('clearSearch');
		},

		searchFocus: function (): void {
			this.set('isInSearchMode', true);
			// Track when search is opened
			M.track({
				action: M.trackActions.click,
				category: 'search'
			});
		},

		loadRandomArticle: function (): void {
			this.sendAction('loadRandomArticle');
		},

		/**
		 * TODO: Refactor, use api
		 *
		 * Temporary solution for enter on search, will be refactored to be a route in mercury
		 * @param value of input
		 */
		enter: function (value = '') {
			console.log('enter pressed in search box');

			//this.set('isInSearchMode', false);
			//this.send('clearSearch');

			this.sendAction('toggleVisibility', false);
			this.send('searchCancel');

			this.sendAction('search', value);
			//window.location.assign('%@Special:Search?search=%@&fulltext=Search'.fmt(Mercury.wiki.articlePath, value));
		}
	},

	shouldBeVisibleObserver: Em.observer('shouldBeVisible', function () {
		var trackLabel: string = this.get('shouldBeVisible') ? 'open' : 'close';
		M.track({
			action: M.trackActions.click,
			category: 'menu',
			label: trackLabel
		});
	}),

	/**
	 * Every time we exit search mode, regardless of if it was through the Cancel
	 * link or through clicking a search result, we want to clear out the query
	 * so that the search bar will clear.
	 */
	isInSearchModeObserver: Em.observer('isInSearchMode', function () {
		if (!this.get('isInSearchMode')) {
			this.send('clearSearch');
		}
	}).on('didInsertElement')
});
