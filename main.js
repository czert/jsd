var len = function(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
};

var A = Object.subClass({
    init: function(maps, values) {
        this.maps = maps;
        this.values = values;
    },

    transform: function(values) {
        var v = [0, 0];
        for (var i in this.maps)
            v = this.maps[i].getTransform(values[i]).apply(v);
        return v;
    },

    draw: function(o) {
        var point = o.apply(this.transform(this.values));
        c = canvas.circle(point[0], point[1], 3);
        c.attr('fill', '#a3c');
        c.attr('stroke', 'none');
        var that = this;
        c.hover(function() {
            that.g = new G(that.maps, that.values);
            that.g.draw(o);
        }, function() {
            that.g.die();
        });
    },
});

var G = A.subClass({
    draw: function(o) {
        var from = this.transform([this.values[0], 0]);
        var r = len(from);
        from = o.apply(from);
        var point = o.apply(this.transform(this.values));
        var to = o.apply(this.transform([0, this.values[1]]));
        this.p = canvas.path('M ' + from.join(',') + ' A ' + [r,r].join(',') + ' 0 ' + (this.values[1] > 0.5 ? '1' : '0') + ' 1 ' + point.join(',') + ' L ' + to.join(','));
    },
    die: function() { this.p.remove() },
});


$(document).ready(function() {
//    var dps = [[0.01, 0], [0.1, 2.5], [1, 5], [10, 7.5], [100, 10]];
    var origin = [400, 300];
    var o = new jsd.core.transform.Translate(origin);

    xmap = new jsd.core.map.Radial();
    ymap = new jsd.core.map.Linear([0, -200], [0, -50]);
    xscale = new jsd.core.scale.Logarithmic(0.01, 1000);
    yscale = new jsd.core.scale.Linear(0, 10);

    canvas = Raphael(0, 0, 800, 600);
    var r = canvas.circle(400, 300, 200);
    r.attr('fill', '#f0f0f0');

    var dps = [];
    for (var i = 0; i < 1000; i++)
    dps.push([Math.random()*1000, Math.random()*10]);
    for (var i in dps) {
        var v = [yscale.to(dps[i][1]), xscale.to(dps[i][0])];
        var a = new A([ymap, xmap], v);
        //        var g = new G([ymap, xmap], v);
        //        g.draw(o);
        a.draw(o);
    };
});
