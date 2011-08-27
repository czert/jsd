
$(document).ready(function(){

    /*
     * Linear
     */

    module('Linear', {setup: function() {
        this.scale = new jsd.core.scale.Linear(4, 8);
    }, teardown: function() {
        delete this.scale;
    }});

    test('to', 5, function() {
        equal(this.scale.to(0), -1);
        equal(this.scale.to(4), 0);
        equal(this.scale.to(8), 1);
        equal(this.scale.to(12), 2);
        equal(this.scale.to(5), 0.25);
    });

    test('from', 5, function() {
        equal(this.scale.from(-1), 0);
        equal(this.scale.from(0), 4);
        equal(this.scale.from(1), 8);
        equal(this.scale.from(2), 12);
        equal(this.scale.from(0.25), 5);
    });


    /*
     * Logarithmic
     */

    module('Logarithmic')

    test('setup', 3, function() {
        this.scale = new jsd.core.scale.Logarithmic(0.01, 10);
        deepEqual([this.scale.lower, this.scale.upper, this.scale.base], [0.01, 10, 10]);
        delete this.scale;

        this.scale = new jsd.core.scale.Logarithmic(0.01, 10, 2);
        deepEqual([this.scale.lower, this.scale.upper, this.scale.base], [0.01, 10, 2]);
        delete this.scale;

        this.scale = new jsd.core.scale.Logarithmic(0.01, 10, Math.E);
        deepEqual([this.scale.lower, this.scale.upper, this.scale.base], [0.01, 10, Math.E]);
        delete this.scale;
    });


    /*
     * Log10
     */

    module('Log10', {setup: function() {
        this.scale = new jsd.core.scale.Logarithmic(0.01, 10);
        this.arg = [0.001, 0.01, 0.1, 1, 10, 100];
        this.res = [
            -0.3333333333,
            0,
            0.3333333333,
            0.6666666666,
            1,
            1.3333333333
        ];
        this.almost = function(a, b) {
            if (a - b < 0.00000001)
                return true;
            return false;
        };
    }, teardown: function() {
        delete this.scale;
        delete this.arg;
        delete this.res;
        delete this.almost;
    }});

    test('to', 6, function() {
        for (var i in this.arg)
            ok(this.almost(this.scale.to(this.arg[i]), this.res[i]));
    });

    test('from', 6, function() {
        for (var i in this.arg)
            ok(this.almost(this.scale.from(this.res[i]), this.arg[i]));
    });


    /*
     * Log2
     */

    module('Log2', {setup: function() {
        this.scale = new jsd.core.scale.Logarithmic(0.5, 8, 2);
        this.arg = [0.125, 0.25, 0.5, 1, 2, 4, 8, 16];
        this.res = [-0.5, -0.25, 0, 0.25, 0.5, 0.75, 1, 1.25];
        this.almost = function(a, b) {
            if (a - b < 0.00000001)
                return true;
            return false;
        };
    }, teardown: function() {
        delete this.scale;
        delete this.arg;
        delete this.res;
        delete this.almost;
    }});

    test('to', 8, function() {
        for (var i in this.arg)
            ok(this.almost(this.scale.to(this.arg[i]), this.res[i]));
    });

    test('from', 8, function() {
        for (var i in this.arg)
            ok(this.almost(this.scale.from(this.res[i]), this.arg[i]));
    });
});
