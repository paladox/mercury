export function initialize(container, application) {
	var debug = M.prop('environment') === 'dev',
	//prevents fail if transitions are empty
		loadedTranslations = M.prop('translations') || {},
	//loaded language name is the first key of the Mercury.state.translations object
		loadedLanguage = Object.keys(loadedTranslations)[0];
	// turn on debugging with querystring ?debug=1
	if (window.location.search.match(/debug=1/)) {
		debug = true;
	}
	App.setProperties({
		apiBase: M.prop('apiBase'),
		language: loadedLanguage || 'en',
		LOG_ACTIVE_GENERATION: debug,
		LOG_VIEW_LOOKUPS: debug,
		LOG_TRANSITIONS: debug,
		LOG_TRANSITIONS_INTERNAL: debug
	});
	$('html').removeClass('preload');
	i18n.init({
		debug: debug,
		detectLngQS: 'uselang',
		fallbackLng: 'en',
		lng: application.get('language'),
		lowerCaseLng: true,
		ns: 'main',
		resStore: loadedTranslations,
		useLocalStorage: false
	});
}

export default {
  name: 'preload',
  initialize: initialize
};
