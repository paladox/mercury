



App.PostReplyComponent = Ember.Component.extend(
	App.DiscussionUpvoteActionSendMixin,
	{
		classNames: ['post-reply'],
		post: null,

		authorUrl: Ember.computed('post', function () {
			return buildUrl({
				namespace: 'User',
				title: this.get('post.createdBy.name'),
			});
		}),
	}
);


