jsd.core.AxMap = Object.subClass({
    init: function(domain, range) {
        this.domain = domain || [];
        this.range = range || [];
    },

    addDomain: function(axis) {
        this.domain.push(axis);
    },

    addRange: function(axis) {
        this.range.push(axis);
    },
});
