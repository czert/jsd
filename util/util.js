jsd.util = {};

// compare two simple, shallow lists
jsd.util.list_compare = function(a, b) {
    if (a.length != b.length)
        return false;
    for (var i = 0; i < a.length; i++)
        if (a[i] !== b[i])
            return false;
    return true;
};

// merge all argument properties into 'root'
jsd.util.merge = function(root) {
    for (var i = 1; i < arguments.length; i++)
        for (var key in arguments[i])
            root[key] = arguments[i][key];
};

// Array Remove - By John Resig (MIT Licensed)
Array.remove = function(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

// provide Array.filter() where unsupported (courtesy of diveintojavascript.com)
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
};
