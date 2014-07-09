/// <reference path="../app.ts" />
/// <reference path="../utils/sloth.ts" />
/// <reference path="../utils/lazyload.ts" />
'use strict';

interface HeadersFromDom {
	level: string;
	name: string;
	id?: string;
}

var sloth = new W.Sloth();

App.ArticleView = Em.View.extend({
	classNames: ['article-wrapper'],
	articleObserver: function() {
		Em.run.later(null, () => {
			var model = this.get('controller.model');
			if (this.get('controller.article') && this.get('controller.article').length > 0) {
				var lazyImages = this.$('.article-media');
				var lazy = new W.LazyLoad();

				lazy.fixSizes(lazyImages);

				sloth.drop();
				sloth.attach({
					on: lazyImages,
					threshold: 400,
					callback: (elem) => lazy.load(elem, false, model.get('media'))
				});

				// TODO: Temporary solution for generating Table of Contents
				// Ideally, we wouldn't be doing this as a post-processing step, but rather we would just get a JSON with
				// ToC data from server and render view based on that.
				var headers: HeadersFromDom[] = this.$('h2').map((i, elem: HTMLElement): HeadersFromDom => {
					return {
						level: elem.tagName,
						name: elem.textContent,
						id: elem.id
					};
				}).toArray();

				this.get('controller').send('updateHeaders', headers);
			}
		}, 1000);
	}.observes('controller.article'),

	click(event) {
		if (event.target.tagName === 'A') {
			debugger;
			var model = this.get('controller.model');
			var basepath = model.get('basepath');
			var title = model.get('title');
			var hash = event.target.hash;
			var uri = event.target.pathname;
			var info = W.getLinkInfo(basepath, title, hash, uri);
			debugger;

			event.preventDefault();

			debugger;
			if (info.article) {
				this.get('controller').send('changePage', info.article);
			} else if (info.url) {
				window.location = info.url;
			} else {
				console.log('unable to open link "' + uri + '"');
			}
		}
	}
});
