import App from '../app';

export default App.PushNotificationsButtonComponent = Ember.Component.extend(
	{
		attributeBindings: ['disabled'],
		classNames: ['push-notifications-button'],
		tagName: 'button',

		disabled: true,

		text: 'Enable Push Messages',

		/**
		 * @returns {void}
		 */
		didInsertElement() {
			this._super();

			// Check that service workers are supported, if so, progressively
			// enhance and add push messaging support, otherwise continue without it.
			if ('serviceWorker' in navigator) {
				console.log('registered')
				navigator.serviceWorker.register('/front/images/push-service-worker.js')
					.then(this.initialiseState);
			} else {
				console.warn('Service workers aren\'t supported in this browser.');
			}
		},

		initiliseState() {
			console.log('initialize');
			// Are Notifications supported in the service worker?
			if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
				console.log('Notifications aren\'t supported.');
				return;
			}

			// Check the current Notification permission.
			// If its denied, it's a permanent block until the
			// user changes the permission
			if (Notification.permission === 'denied') {
				console.log('The user has blocked notifications.');
				return;
			}

			// Check if push messaging is supported
			if (!('PushManager' in window)) {
				console.log('Push messaging isn\'t supported.');
				return;
			}

			console.log(77);

			// We need the service worker registration to check for a subscription
			navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {

				console.log(88);
				// Do we already have a push message subscription?
				serviceWorkerRegistration.pushManager.getSubscription()
					.then((subscription) => {
						console.log(99);

						// Enable any UI which subscribes / unsubscribes from
						// push messages.
						console.log(this);
						this.set('disabled', false);

						if (!subscription) {
							// We aren't subscribed to push, so set UI
							// to allow the user to enable push
							return;
						}

						// Keep your server in sync with the latest subscriptionId
						//sendSubscriptionToServer(subscription);

						// Set your UI to show they have subscribed for
						// push messages
						this.set('text', 'Disable Push Messages')
					})
					.catch(function(err) {
						console.log('Error during getSubscription()', err);
					});
			});
		},

		actions: {
		},
	}
);
