/*
 * 3x3 matrices for use as 2D affine transformations
 *
 * list serialization follows SVG style and has the following format:
 *
 *  list:
 *      [a, b, c, d, e, f]
 *
 *  matrix:
 *     /  a  c  e  \
 *     |  b  d  f  |
 *     \  0  0  1  /
 *
 *  internal entry mapping:
 *     [[ 00 01 02 ],
 *      [ 10 11 12 ],
 *      [ 20 21 22 ]]
 */

jsd.core.Matrix = Object.subClass({
    init: function(list) {
        this.entries = [[1,0,0],[0,1,0],[0,0,1]];
        if (list !== undefined) {
            this.entries[0][0] = list[0];
            this.entries[1][0] = list[1];
            this.entries[0][1] = list[2];
            this.entries[1][1] = list[3];
            this.entries[0][2] = list[4];
            this.entries[1][2] = list[5];
        };
    },

    get: function(i, j) {
        return this.entries[i][j];
    },

    set: function(i, j, value) {
        this.entries[i][j] = value;
    },

    serialize: function() {
        var list = [];
        for (var j = 0; j < 3; j++)
            for (var i = 0; i < 2; i++)
                list.push(this.get(i, j));
        return list;
    },

    copy: function() {
        return new jsd.core.Matrix(this.serialize());
    },

    invert: function() {
        var inverted = [[],[],[]];
        for (var j = 0; j < 3; j++)
            for (var i = 0; i < 3; i++)
                inverted[j].push(this.get(i, j));
        this.entries = inverted;
    },
});
