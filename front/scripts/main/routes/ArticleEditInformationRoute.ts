/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />
/// <reference path="../mixins/FullPageMixin.ts"/>

'use strict';

App.ArticleEditInformationRoute = Em.Route.extend(App.ViewportMixin, {
	/*
	model: function(params: any): Em.RSVP.Promise {
		console.log('ArticleEditInformationRoute.model');
		console.log(params);
		return App.ArticleEditPreviewModel.load(params.title, params.sectionIndex);
	},
	*/

	renderTemplate(): void {
		this.render('article-edit-information');
	},

	/*
	 actions: {
	 error(error: any, transition: EmberStates.Transition): boolean {
	 this.controllerFor('application').addAlert({
	 message: i18n.t('app.edit-load-error'),
	 type: 'alert'
	 });
	 M.track({
	 action: M.trackActions.impression,
	 category: 'sectioneditor',
	 label: 'edit-load-error'
	 });
	 return true;
	 }
	 }
	 */
});
