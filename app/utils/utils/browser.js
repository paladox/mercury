/**
 * Detects if user is using iOS or Android system
 * @return {string}
 */
export default function getSystem () {
	var ua = window.navigator.userAgent,
		system;

	if (ua.match(/iPad|iPhone|iPod/i) !== null) {
		system = 'ios';
	} else if (ua.match(/Android/i) !== null) {
		system = 'android';
	}

	return system;
}
