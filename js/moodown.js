/**
 * Created by MrIsaacs on 14.01.2016.
 */

var MooDown = new Class ({
    Implements          : Options,

    markdown            : null,

    options : {
        markdown    : null // The class for markdown text element
    },

    moodown : function(element, text){
        var converter = new showdown.Converter({
            'headerLevelStart'  : '2',
            tables              : true
        });
        var html = converter.makeHtml(text);

        $(element).set('html', html);
    },

    initialize : function(element, options) {
        var that = this;

        this.setOptions(options);
        this.moodown(element, this.options.markdown);
    }
});