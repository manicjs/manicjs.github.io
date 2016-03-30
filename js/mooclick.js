/**
 * Created by MrIsaacs on 06.02.2016.
 */

var MooClick = new Class ({
    Implements : Options,

    elements   : [],
    _elements  : [],                // array of all elements return by expression
    _fn        : false,

    options : {
        hasData        : false,
        requestObject  : false
    },

    initialize : function (elements, options, fn) {
        this.setOptions(options);

        this._elements = elements;
        this._fn       = fn;

        this.refresh();

        return this;
    },

    refresh    : function () {
        var that = this;
        // set elements to an empty array
        this.elements = [];

        Array.each($$(that._elements), function(data) {
            if (that.options.hasData && data.hasAttribute(('data-' + that.options.hasData))) {
                if (typeof that._fn === 'function') {
                    data.addEvent('click', that._fn);
                }

                that.elements.push(data);
            }
        });
    }
});