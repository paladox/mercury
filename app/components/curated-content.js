import Ember from 'ember';
import CuratedContentModel from '../models/curated-content';

export default Ember.Component.extend({
	classNames: ['curated-content'],
	classNameBindings: ['showItems'],
	globalNavHeight: 57,
	topLevelSection: null,
	sectionsStack: Ember.A(),
	currentSection: Ember.computed('sectionsStack.@each', function () {
		return this.get('sectionsStack.lastObject');
	}),

	didInsertElement () {
		this.setProperties({
			model: CuratedContentModel.create(),
			spinnerDelay: 50
		});

		this.createTopLevelSection();
	},
	willDestroyElement () {
		this.sectionsStack.clear();
	},

	actions: {
		clickItem (item) {
			if (item.type === 'section' || item.type === 'category') {
				this.loadSection(item);
			} else {
				this.trackClick('modular-main-page', 'curated-content-item-article');
			}
		},

		goBack () {
			this.trackClick('modular-main-page', 'curated-content-back');
			this.sectionsStack.popObject();
		}
	},
	createTopLevelSection () {
		var topLevelSection,
			topLevelSectionItems = this.get('topLevelSection').map((item) => {
				return this.get('model').sanitizeItem(item);
			});

		topLevelSection = {
			items: topLevelSectionItems,
			isTopSection: true
		};

		this.sectionsStack.pushObject(topLevelSection);
	},
	loadSection: function (item) {
		var sectionName,
			currentLevel = this.get('sectionsStack.length') - 1,
			nonInteractive = currentLevel > 0;

		this.showLoader();
		this.trackClick('modular-main-page', 'curated-content-item-level-' + currentLevel, nonInteractive);

			if (item.type === 'section') {
			sectionName = item.label;
		} else {
			// Remove Category: (or a localized one) prefix
			sectionName = item.categoryName.substr(item.categoryName.indexOf(':') + 1);
		}

		this.get('model')
			.fetchItemsForSection(sectionName, item.type)
			.then((items) => {
				this.onSectionLoaded(items, item);
			})
			.catch(() => {
				// TODO what now? should we show an error message?
				this.hideLoader();
			});
	},

	onSectionLoaded (items, parent) {
		var section = {
			label: parent.label,
			items: items,
			isTopSection: false
		};
		this.sectionsStack.pushObject(section);
		this.hideLoader();
		$('html, body').animate({
			scrollTop: this.$().offset().top - this.get('globalNavHeight')
		}, 500);
	}
});
