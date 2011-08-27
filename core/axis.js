jsd.core.Axis = Object.subClass({
    init: function(name, scale, map, shift) {
        this.name = name;
        this.scale = scale;
        this.map = map;
        this.originShift = shift;
    },
});
