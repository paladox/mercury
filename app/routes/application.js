import Ember from 'ember';
import trackClickMixin from '../mixins/track-click';

export default Ember.Route.extend(Ember.TargetActionSupport, trackClickMixin, {
    model: function (params) {
        return params;
    },
    activate: function () {
        var _this = this;
        /**
         * This global function is being used by our AdEngine code to provide prestitial/interstitial ads
         * It works in similar way on Oasis: we call ads server (DFP) to check if there is targeted ad unit for a user.
         * If there is and it's in a form of prestitial/interstitial the ad server calls our exposed JS function to
         * display the ad in a form of modal. The ticket connected to the changes: ADEN-1834.
         */
        Mercury.Modules.Ads.getInstance().openLightbox = function (contents) {
            _this.send('openLightbox', 'ads', { contents: contents });
        };
    },
    actions: {
        loading: function () {
            this.controller.showLoader();
        },
        didTransition: function () {
            // Activate any A/B tests for the new route
            M.VariantTesting.activate();
            this.controller.hideLoader();
            /*
             * This is called after the first route of any application session has loaded
             * and is necessary to prevent the ArticleModel from trying to bootstrap from the DOM
             */
            M.prop('firstPage', false);
        },
        error: function () {
            this.controller.hideLoader();
        },
        handleLink: function (target) {
            // Use this to get current route info
            // this.router.get('currentState.routerJsState')
            var handlerInfos = this.router.get('currentState.routerJsState.handlerInfos'), currentRoute = handlerInfos[handlerInfos.length - 1], title, trackingCategory, info,
            // exec() returns an array of matches or null if no match is found.
            domainNameRegExpMatchArray = /\.[a-z0-9\-]+\.[a-z0-9]{2,}$/i.exec(window.location.hostname), cookieDomain = domainNameRegExpMatchArray ? '; domain=' + domainNameRegExpMatchArray[0] : '', defaultSkin = Ember.getWithDefault(Mercury, 'wiki.defaultSkin', 'oasis');
            if (currentRoute === 'article') {
                title = this.controllerFor('article').get('model').get('title');
            }
            else {
                title = '';
            }
            trackingCategory = target.dataset.trackingCategory;
            info = M.getLinkInfo(Mercury.wiki.basePath, title, target.hash, target.href);
            /**
             * Handle tracking
             */
            if (trackingCategory) {
                this.triggerAction({
                    action: 'trackClick',
                    target: this,
                    actionContext: trackingCategory
                });
            }
            /**
             * handle links that are external to the application like ?useskin=oasis
             */
            if (target.className.indexOf('external') > -1) {
                if (target.href.indexOf('useskin=' + defaultSkin) > -1) {
                    document.cookie = 'useskin=' + defaultSkin + cookieDomain + '; path=/';
                }
                return window.location.assign(target.href);
            }
            if (info.article) {
                this.transitionTo('article', info.article);
            }
            else if (info.url) {
                /**
                 * If it's a jump link or a link to something in a Wikia domain, treat it like a normal link
                 * so that it will replace whatever is currently in the window.
                 * TODO: this regex is alright for dev environment, but doesn't work well with production
                 */
                if (info.url.charAt(0) === '#' || info.url.match(/^https?:\/\/.*\.wikia(\-.*)?\.com.*\/.*$/)) {
                    window.location.assign(info.url);
                }
                else {
                    window.open(info.url);
                }
            }
            else {
                // Reaching this clause means something is probably wrong.
                Ember.Logger.error('unable to open link', target.href);
            }
        },
        loadRandomArticle: function () {
            var _this = this;
            this.get('controller').set('sideNavCollapsed', true);
            App.ArticleModel
                .getArticleRandomTitle()
                .then(function (articleTitle) {
                _this.transitionTo('article', encodeURIComponent(M.String.sanitize(articleTitle)));
            })
                .catch(function (err) {
                _this.send('error', err);
            });
        },
        // We need to proxy these actions because of the way Ember is bubbling them up through routes
        // see http://emberjs.com/images/template-guide/action-bubbling.png
        handleLightbox: function () {
            this.get('controller').send('handleLightbox');
        },
        openLightbox: function (lightboxType, lightboxModel) {
            this.get('controller').send('openLightbox', lightboxType, lightboxModel);
        },
        closeLightbox: function () {
            this.get('controller').send('closeLightbox');
        },
        // This is used only in not-found.hbs template
        expandSideNav: function () {
            this.get('controller').set('sideNavCollapsed', false);
        }
    }
});
