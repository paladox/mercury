export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}
App.initializer({
	name: 'setupTracking',
	after: 'currentUser',
	initialize: function (container, application) {
		var UA = Mercury.Modules.Trackers.UniversalAnalytics, dimensions = [], adsContext = Mercury.Modules.Ads.getInstance().getContext();
		function getPageType() {
			var mainPageTitle = Mercury.wiki.mainPageTitle, isMainPage = window.location.pathname.split('/').indexOf(mainPageTitle);
			return isMainPage >= 0 ? 'home' : 'article';
		}
		/**** High-Priority Custom Dimensions ****/
		dimensions[1] = Mercury.wiki.dbName; // dbName
		dimensions[2] = Mercury.wiki.language.content; // ContentLanguage
		dimensions[4] = 'mercury'; // Skin
		dimensions[5] = M.prop('userId') ? 'user' : 'anon'; // LoginStatus
		dimensions[9] = String(Mercury.wiki.id); // CityId
		dimensions[8] = getPageType;
		dimensions[15] = 'No'; // IsCorporatePage
		// TODO: Krux segmenting not implemented in Mercury https://wikia-inc.atlassian.net/browse/HG-456
		// ga(prefix + 'set', 'dimension16', getKruxSegment());                             // Krux Segment
		dimensions[17] = Mercury.wiki.vertical; // Vertical
		dimensions[19] = M.prop('article.type'); // ArticleType
		if (adsContext) {
			dimensions[3] = adsContext.targeting.wikiVertical; // Hub
			dimensions[14] = adsContext.opts.showAds ? 'Yes' : 'No'; // HasAds
		}
		if (Mercury.wiki.wikiCategories instanceof Array) {
			dimensions[18] = Mercury.wiki.wikiCategories.join(','); // Categories
		}
		dimensions = Mercury.Utils.VariantTesting.integrateOptimizelyWithUA(dimensions);
		UA.setDimensions(dimensions);
	}
});
export default {
  name: 'setup-tracking',
  initialize: initialize
};
