import env from '../config/environment';

export function initialize(container, application) {
	var debug = env.environment === 'development',
		//prevents fail if transitions are empty
		//TODO: send correct translations
		loadedTranslations = {} || {},
		//loaded language name is the first key of the Mercury.state.translations object
		loadedLanguage = Object.keys(loadedTranslations)[0];

	application.setProperties({
		language: loadedLanguage || 'en'
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
