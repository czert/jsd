jsd.core.Axis = Object.subClass({
    init: function(name, scale, map, shift) {
        this.name = name;
        this.scale = scale;
        this.map = map;
        this.originShift = shift;

        // series that have this axis as a domain
        this.dom_series = [];

        // series that have this axis as a range
        this.ran_series = [];
    },
});
