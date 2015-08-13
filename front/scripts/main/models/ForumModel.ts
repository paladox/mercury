/// <reference path="../app.ts" />

App.ForumModel = Em.Object.extend({
});

App.ForumModel.reopenClass({
	find(wikiId: number, forumId: number) {
		return new Em.RSVP.Promise((resolve: Function, reject: Function) => {
			Em.$.ajax({
				url: `https://services.wikia-dev.com/discussion/${wikiId}/forums/${forumId}`,
				dataType: 'json',
				success: (data) => resolve(data),
				error: (err) => reject(err)
			});
		});
	},
});
