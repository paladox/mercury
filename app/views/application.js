import Ember from 'ember';

export default Ember.View.extend({
    classNameBindings: ['systemClass', 'smartBannerVisible', 'verticalClass'],
    verticalClass: Ember.computed(function () {
        var vertical = Ember.get(Mercury, 'wiki.vertical');
        return vertical + '-vertical';
    }),
    systemClass: Ember.computed(function () {
        var system = Mercury.Utils.Browser.getSystem();
        return system ? 'system-' + system : '';
    }),
    smartBannerVisible: Ember.computed.alias('controller.smartBannerVisible'),
    sideNavCollapsed: Ember.computed.alias('controller.sideNavCollapsed'),
    alertNotifications: Ember.computed.alias('controller.alertNotifications'),
    noScroll: Ember.computed.alias('controller.noScroll'),
    scrollLocation: null,
    willInsertElement: function () {
        $('#article-preload').remove();
        // A/B test spinner (HG-727)
        $('.ab-test-loading-overlay').remove();
    },
    /**
     * Necessary because presently, we open external links in new pages, so if we didn't
     * cancel the click event on the current page, then the mouseUp handler would open
     * the external link in a new page _and_ the current page would be set to that external link.
     */
    click: function (event) {
        /**
         * check if the target has a parent that is an anchor
         * We do this for links in the form <a href='...'>Blah <i>Blah</i> Blah</a>,
         * because if the user clicks the part of the link in the <i></i> then
         * target.tagName will register as 'I' and not 'A'.
         */
        var $anchor = Ember.$(event.target).closest('a'), target = $anchor.length ? $anchor[0] : event.target, tagName;
        if (target && this.shouldHandleClick(target)) {
            tagName = target.tagName.toLowerCase();
            if (tagName === 'a') {
                this.handleLink(target);
                event.preventDefault();
            }
        }
    },
    sideNavCollapsedObserver: Ember.observer('sideNavCollapsed', function () {
        if (this.get('sideNavCollapsed')) {
            this.set('noScroll', false);
        }
        else {
            this.set('noScroll', true);
        }
    }),
    noScrollObserver: Ember.observer('noScroll', function () {
        var $body = Ember.$('body'), scrollLocation;
        if (this.get('noScroll')) {
            scrollLocation = $body.scrollTop();
            this.set('scrollLocation', scrollLocation);
            $body.css('top', -scrollLocation)
                .addClass('no-scroll');
        }
        else {
            $body.removeClass('no-scroll')
                .css('top', '');
            window.scrollTo(0, this.get('scrollLocation'));
            this.set('scrollLocation', null);
        }
    }),
    /**
     * Determine if we have to apply special logic to the click handler for MediaWiki / UGC content
     */
    shouldHandleClick: function (target) {
        var $target = $(target), isReference = this.targetIsReference(target);
        return ($target.closest('.mw-content').length &&
            // ignore polldaddy content
            !$target.closest('.PDS_Poll').length &&
            // don't need special logic for article references
            !isReference);
    },
    /**
     * Determine if the clicked target is an reference/in references list (in text or at the bottom of article)
     */
    targetIsReference: function (target) {
        var $target = $(target);
        return !!($target.closest('.references').length ||
            $target.parent('.reference').length);
    },
    handleLink: function (target) {
        var controller;
        Ember.Logger.debug('Handling link with href:', target.href);
        /**
         * If either the target or the target's parent is an anchor (and thus target == true),
         * then also check if the anchor has an href. If it doesn't we assume there is some other
         * handler for it that deals with it based on ID or something and we just skip it.
         */
        if (target && target.href) {
            /**
             * But if it does have an href, we check that it's not the link to expand the comments
             * If it's _any_ other link than that comments link, we stop its action and
             * pass it up to handleLink
             */
            if (!target.href.match('^' + window.location.origin + '\/a\/.*\/comments$')) {
                controller = this.get('controller');
                controller.send('closeLightbox');
                controller.send('handleLink', target);
            }
        }
    }
});
