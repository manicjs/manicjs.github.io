/*
 ---
 description: Creates a navigation bar.
 license: MIT-style
 authors:
 - Ivan Ilić
 provides:
 - docknav
 ...
 */

var docknav = new Class({
    Implements      : Options,

    options         : {
        navContainer : null,
        navOffsetTop : null
    },

    docknav : function (element) {
        if(this.options.navOffsetTop < window.getScroll().y && !this.options.navContainer.hasClass('has-docked-nav')) {
            this.options.navContainer.addClass('has-docked-nav')
        }
        if(this.options.navOffsetTop > window.getScroll().y && this.options.navContainer.hasClass('has-docked-nav')) {
            this.options.navContainer.removeClass('has-docked-nav')
        }
    },

    initialize  : function (element, options) {
        var that = this;
        this.options.navContainer = $$('body')[0];
        this.options.navOffsetTop = document.getElement('nav').getPosition().y;

        this.setOptions(options);

        window.addEvents({
            domready    : function () {
                that.docknav($(element));
            },
            scroll      : function () {
                that.docknav($(element));
            }
        });
    }
});