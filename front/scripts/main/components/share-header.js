


App.ShareHeaderComponent = Ember.Component.extend(
	App.HeadroomMixin,
	{
		classNames: ['share-header'],
		headroomOptions: {
			classes: {
				initial: 'pinned',
				pinned: 'pinned',
			},
		},
	}
);


