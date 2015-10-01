/// <reference path="../app.ts" />
'use strict';

Em.LinkComponent.reopen({
	attributeBindings: ['data-tracking-category'],

	//it allows to use action='x' actionParam='y' in link-to helper
	action: null,
	_invoke(event: Event): boolean {
		var action: string = this.get('action');
		if (action) {
			// There was an action specified (in handlebars) so take custom action
			if (this.bubbles === false) {
				event.stopPropagation();
			}

			// trigger the action on the controller
			this.get('parentView').get('context').send(action, this.get('actionParam'));
		}

		// no action to take, handle the link-to normally
		return this._super(event);
	}
});
