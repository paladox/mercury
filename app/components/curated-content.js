import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['curated-content'],
	classNameBindings: ['showItems'],
	globalNavHeight: 57,
	topLevelSection: null,
	sectionsStack: Ember.A(),
	currentSection: Ember.computed('sectionsStack.@each', function () {
		return this.get('sectionsStack.lastObject');
	}),
	didInsertElement: function () {
		this.setProperties({
			model: App.CuratedContentModel.create(),
			spinnerDelay: 50
		});
		this.createTopLevelSection();
	},
	willDestroyElement: function () {
		this.sectionsStack.clear();
	},
	actions: {
		clickItem: function (item) {
			if (itEmber.type === 'section' || itEmber.type === 'category') {
				this.loadSection(item);
			}
			else {
				this.trackClick('modular-main-page', 'curated-content-item-article');
			}
		},
		goBack: function () {
			this.trackClick('modular-main-page', 'curated-content-back');
			this.sectionsStack.popObject();
		}
	},
	createTopLevelSection: function () {
		var _this = this;
		var topLevelSection, topLevelSectionItems;
		topLevelSectionItems = this.get('topLevelSection').map(function (item) {
			return _this.get('model').sanitizeItem(item);
		});
		topLevelSection = {
			items: topLevelSectionItems,
			isTopSection: true
		};
		this.sectionsStack.pushObject(topLevelSection);
	},
	loadSection: function (item) {
		var _this = this;
		var sectionName, currentLevel = this.get('sectionsStack.length') - 1, nonInteractive = currentLevel > 0;
		this.showLoader();
		this.trackClick('modular-main-page', 'curated-content-item-level-' + currentLevel, nonInteractive);
		if (itEmber.type === 'section') {
			sectionName = itEmber.label;
		}
		else {
			// Remove Category: (or a localized one) prefix
			sectionName = itEmber.categoryName.substr(itEmber.categoryName.indexOf(':') + 1);
		}
		this.get('model')
			.fetchItemsForSection(sectionName, itEmber.type)
			.then(function (items) {
				_this.onSectionLoaded(items, item);
			})
			.catch(function () {
				// TODO what now? should we show an error message?
				_this.hideLoader();
			});
	},
	onSectionLoaded: function (items, parent) {
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
