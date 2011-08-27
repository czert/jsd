
$(document).ready(function(){

    /*
     * Basic
     */

    module('Basic');

    test('constructor', 9, function() {
        var matrix = new jsd.core.Matrix([1, 2, 3, 4, 5, 6]);
        strictEqual(matrix.entries[0][0], 1);
        strictEqual(matrix.entries[1][0], 2);
        strictEqual(matrix.entries[0][1], 3);
        strictEqual(matrix.entries[1][1], 4);
        strictEqual(matrix.entries[0][2], 5);
        strictEqual(matrix.entries[1][2], 6);
        strictEqual(matrix.entries[2][0], 0);
        strictEqual(matrix.entries[2][1], 0);
        strictEqual(matrix.entries[2][2], 1);
    });

    test('get', 2, function() {
        var matrix = new jsd.core.Matrix([1, 2, 3, 4, 5, 6]);
        strictEqual(matrix.get(0, 1), 3);
        strictEqual(matrix.get(2, 1), 0);
    });

    test('set', 1, function() {
        var matrix = new jsd.core.Matrix();
        matrix.set(0, 1, 42);
        matrix.set(1, 2, 24);
        deepEqual(matrix.serialize(), [1, 0, 42, 1, 0, 24]);
    });

    test('serialize', 2, function() {
        var e1 = [1, 0, 0, 1, 0, 0];
        var m1 = new jsd.core.Matrix();
        deepEqual(m1.serialize(), e1);

        var e2 = [1, 2, 3, 4, 5, 6];
        var m2 = new jsd.core.Matrix(e2);
        deepEqual(m2.serialize(), e2);
    });

    test('copy', 1, function() {
        var matrix = new jsd.core.Matrix();
        matrix.set(0, 1, 42);
        deepEqual(matrix.copy().serialize(), [1, 0, 42, 1, 0, 0]);
    });

    /*
     * Operations
     */

    module('Operations', {setup: function() {
        this.identity = new jsd.core.Matrix();
        this.matrix = new jsd.core.Matrix([1, 2, 3, 4, 5, 6]);
    }, teardown: function() {
        delete this.identity;
        delete this.matrix;
    }});

    test('invert, get~', 3, function() {
        var I = this.identity.copy();
        this.identity.invert();
        deepEqual(this.identity.serialize(), I.serialize());

        this.matrix.invert();
        deepEqual(this.matrix.serialize(), [1, 3, 2, 4, 0, 0]);

        var m = this.matrix.getInvert();
        deepEqual(m.serialize(), [1, 2, 3, 4, 5, 6]);
    });

    test('multiply, get~', 2, function() {
        var M = this.matrix.copy();
        M.multiply(this.identity);
        deepEqual(M.serialize(), this.matrix.serialize());

        var N = this.matrix.copy();
        N.invert();
        var X = N.getMultiply(M);
        deepEqual(X.entries, [[35, 44, 5], [44, 56, 6], [5, 6, 1]]);
    });
});
