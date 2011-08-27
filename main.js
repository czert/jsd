$(document).ready(function() {
    var s = new jsd.core.scale.Linear(4, 8);
    console.log(s.to(4), s.to(8), s.to(5));
    console.log(s.from(0), s.from(1), s.from(0.25));
    var l = new jsd.core.scale.Logarithmic(0.01, 10);
    console.log(l.lower, l.upper, l.base);
    console.log(l.to(0.01), l.to(10), l.to(1));
    console.log(l.from(0), l.from(1), l.from(0.6666666));
});
