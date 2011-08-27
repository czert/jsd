jsd.core.scale = {};

jsd.core.Scale = Object.subClass({
    init: function(lower, upper) {
        this.lower = lower;
        this.upper = upper;
    },
    
    to: function(value) {
        throw new Error('not implemented');
    },

    from: function(value) {
        throw new Error('not implemented');
    },

    getBounds: function() {
        return [this.lower, this.upper];
    },

    getLower: function() {
        return this.lower;
    },

    getUpper: function() {
        return this.upper;
    },
});


jsd.core.scale.Linear = jsd.core.Scale.subClass({
    init: function() {
        this._super.apply(this, arguments);
    },

    to: function(value) {
        return (value - this.lower) / (this.upper - this.lower);
    },

    from: function(value) {
        return this.lower + value * (this.upper - this.lower);
    },
});


jsd.core.scale.Logarithmic = jsd.core.Scale.subClass({
    init: function() {
        this._super.apply(this, arguments);
        if (arguments[2] === undefined)
            this.base = 10;
        else
            this.base = arguments[2];
        this.llower = this._log(this.lower);
        this.lupper = this._log(this.upper);
    },

    _log: function(arg) {
        if (arg <= 0) {
            throw new Error('invalid log argument');
        };
        return Math.log(arg) / Math.log(this.base);
    },

    to: function(value) {
        return (this._log(value) - this.llower) / (this.lupper - this.llower);
    },

    from: function(value) {
        return Math.pow(this.base, this.llower + value * (this.lupper - this.llower));
    },
});
