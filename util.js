
// merge all argument properties into 'root'
function merge(root) {
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
