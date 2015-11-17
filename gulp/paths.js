/*
 * Path list for tasks
 */
var path = require('path'),
	basePath = 'www',
	baseServer = basePath + '/server',
	baseFront = basePath + '/front';

module.exports = {
	base: basePath,
	baseFull: path.resolve(basePath),
	baseFullServer: path.resolve(baseServer),
	baseFullFront: path.resolve(baseFront),
	vendor: {
		src: 'front/vendor/**/*',
		dest: basePath + '/front/vendor'
	},
	locales: {
		src: 'front/locales/**/*.json',
		dest: basePath + '/front/locales'
	},
	styles: {
		src: 'front/styles',
		watch: 'front/styles/**/*.scss',
		dest: basePath + '/front/styles',
		partials: '_*.scss',
		compile: '*.scss'
	},
	scripts: {
		front: {
			src: 'front/scripts',
			dest: basePath + '/front/scripts',
			tsFiles: '**/*.ts',
			tsdFiles: '**/*.d.js',
			jsFiles: {
				auth: [
					'**/*.js'
				],
				baseline: [
					'**/*.js'
				],
				dev: [
					'**/*.js'
				],
				discussions: [
					'**/*.js'
				],
				main: [
					'app.js',
					'router.js',

					//mixins
					'mixins/ads.js',
					'mixins/alert-notifications.js',
					'mixins/article-content.js',
					'mixins/article-edit.js',
					'mixins/curated-content-editor-labels.js',
					'mixins/curated-content-editor-layout.js',
					'mixins/curated-content-editor-sortable-items.js',
					'mixins/curated-content-thumbnail.js',
					'mixins/discussion-error.js',
					'mixins/discussion-route-upvote.js',
					'mixins/discussion-upvote-action-send.js',
					'mixins/discussion-upvote-component.js',
					'mixins/featured-content.js',
					'mixins/full-page.js',
					'mixins/headroom.js',
					'mixins/ieiframe-focus-fix.js',
					'mixins/languages.js',
					'mixins/link-component.js',
					'mixins/main-page-route.js',
					'mixins/meta-tags.js',
					'mixins/object-utilities.js',
					'mixins/poll-daddy.js',
					'mixins/thirds-click.js',
					'mixins/track-click.js',
					'mixins/viewport.js',
					'mixins/visibility-state-manager.js',
					'mixins/visible.js',
					'mixins/widget-script-state.js',

					//components
					'components/ad-slot.js',
					'components/alert-notification.js',
					'components/alert-notifications.js',
					'components/application-wrapper.js',
					'components/article-add-photo.js',
					'components/article-comment.js',
					'components/article-comments.js',
					'components/article-content.js',
					'components/article-contribution.js',
					'components/article-edit.js',
					'components/article-wrapper.js',
					'components/collapsible-menu.js',
					'components/community-badge.js',
					'components/curated-content-editor-block.js',
					'components/curated-content-editor-image-crop.js',
					'components/curated-content-editor-image-search.js',
					'components/curated-content-editor-item-form.js',
					'components/curated-content-editor-item.js',
					'components/curated-content-editor-row.js',
					'components/curated-content-editor-section.js',
					'components/curated-content-editor.js',
					'components/curated-content-item.js',
					'components/curated-content.js',
					'components/discussion-app-promotion.js',
					'components/discussion-back-button.js',
					'components/discussion-connection-error.js',
					'components/discussion-contributors.js',
					'components/discussion-header.js',
					'components/discussion-hero-unit.js',
					'components/discussion-not-found-error.js',
					'components/discussion-sort.js',
					'components/discussion-upvote-post.js',
					'components/discussion-upvote-reply.js',
					'components/featured-content-item.js',
					'components/featured-content-variation1.js',
					'components/featured-content-variation2.js',
					'components/featured-content-variation3.js',
					'components/featured-content.js',
					'components/file-input.js',
					'components/forum-wrapper.js',
					'components/gallery-media.js',
					'components/image-media.js',
					'components/infobox-image-collection.js',
					'components/infobox-image-media.js',
					'components/lightbox-ads.js',
					'components/lightbox-image.js',
					'components/lightbox-map.js',
					'components/lightbox-media.js',
					'components/lightbox-video.js',
					'components/lightbox-wrapper.js',
					'components/linked-gallery-media.js',
					'components/loading-spinner.js',
					'components/local-nav-menu.js',
					'components/local-wikia-search.js',
					'components/login-icon.js',
					'components/main-page.js',
					'components/media.js',
					'components/modal-dialog.js',
					'components/portable-infobox.js',
					'components/post-detail.js',
					'components/post-reply.js',
					'components/share-feature.js',
					'components/share-header.js',
					'components/side-nav.js',
					'components/site-head.js',
					'components/smart-banner.js',
					'components/trending-articles-item.js',
					'components/trending-articles.js',
					'components/trending-videos-item.js',
					'components/trending-videos.js',
					'components/user-avatar.js',
					'components/user-menu.js',
					'components/video-media.js',
					'components/widget-flite.js',
					'components/widget-polldaddy.js',
					'components/widget-twitter.js',
					'components/widget.js',
					'components/wikia-footer.js',
					'components/wikia-in-your-lang.js',
					'components/wikia-map.js',
					'components/wikia-stats.js',
					'components/wikia-users.js',

					//controllers
					'controllers/application.js',
					'controllers/article-add-photo.js',
					'controllers/article-edit.js',
					'controllers/article.js',
					'controllers/curated-content-editor-section.js',
					'controllers/discussion-forum.js',
					'controllers/discussion-post.js',
					'controllers/main-page.js',
					'controllers/search-results.js',
					'CurrentUser.js',
					'helpers/duration-helper.js',
					'helpers/i18n-helper.js',
					'helpers/numeral-helper.js',
					'helpers/svg-helper.js',
					'helpers/thumbnail-helper.js',
					'helpers/time-ago-helper.js',
					'helpers/truncate-helper.js',

					//models
					'models/article-add-photo.js',
					'models/article-comments.js',
					'models/article-edit.js',
					'models/article.js',
					'models/curated-content-editor-item.js',
					'models/curated-content-editor.js',
					'models/curated-content.js',
					'models/discussion-forum.js',
					'models/discussion-index.js',
					'models/discussion-post.js',
					'models/main-page.js',
					'models/media.js',
					'models/search-images.js',
					'models/user.js',
					'models/wikia-in-your-lang.js',

					//routes
					'routes/application.js',
					'routes/article-add-photo.js',
					'routes/article-edit.js',
					'routes/article.js',
					'routes/curated-content-editor-block-add-item.js',
					'routes/curated-content-editor-block-edit-item.js',
					'routes/curated-content-editor-index.js',
					'routes/curated-content-editor-invalid.js',
					'routes/curated-content-editor-section-add-item.js',
					'routes/curated-content-editor-section-add.js',
					'routes/curated-content-editor-section-edit-item.js',
					'routes/curated-content-editor-section-edit.js',
					'routes/curated-content-editor-section-index.js',
					'routes/curated-content-editor-section.js',
					'routes/curated-content-editor.js',
					'routes/discussion-forum.js',
					'routes/discussion-index.js',
					'routes/discussion-post.js',
					'routes/main-page-category.js',
					'routes/main-page-section.js',
					'routes/main-page.js',
					'routes/not-found.js',
					'routes/search-results.js'
				],
				mercury: [
					'modules/Trackers/*.js',
					'modules/VideoPlayers/*.js',
					'modules/Thumbnailer.js',
					'modules/VideoLoader.js',
					'utils/*.js',
					'modules/Ads.js',
					'Mercury.js'
				]
			}
		},
		server: {
			src: 'server/**/*.ts',
			config: 'config/*.ts',
			dest: basePath
		}
	},
	views: {
		src: 'server/views/**/*.+(hbs|js)',
		dest: basePath + '/server/views'
	},
	templates: {
		src: 'front/templates',
		dest: basePath + '/front/templates',
		files: '**/*.hbs'
	},
	symbols: {
		src: 'front/svg/symbols',
		dest: basePath + '/front/svg',
		files: '*.svg'
	},
	images: {
		src: ['front/svg/images/*', 'front/images/*'],
		dest: basePath + '/front/images'
	},
	nodeModules: {
		src: 'node_modules',
		dest: basePath + '/node_modules'
	},
	server: {
		script: basePath + '/server/server.js'
	},
	config: {
		path: 'config/',
		baseFile: 'localSettings.base.ts',
		exampleFile: 'localSettings.example.ts',
		testFile: 'localSettings.test.ts',
		runtimeFile: 'localSettings.ts'
	}
};
