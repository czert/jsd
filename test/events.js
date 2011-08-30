
$(document).ready(function(){

    // TODO tests for undefined context bindings

    /*
     * Bind
     */

    module('Bind', {setup: function() {
        this.observed = new jsd.core.Observed();
        this.observer1 = {
            foo: function() {},
            bar: function() {}
        };
        this.observer2 = {
            foo: function() {},
            bar: function() {}
        };
    }, teardown: function() {
        delete this.observed;
        delete this.observer1;
        delete this.observer2;
    }});

    test('__listeners', 3, function() {
        this.observed.bind('boo', this.observer1.foo, this.observer1);
        ok(this.observed.__listeners);
        deepEqual(this.observed.__listeners['boo'], [
            [this.observer1.foo, this.observer1, undefined]
            ]);

        this.observed.bind('boo', this.observer2.foo, this.observer2, [1, 'two']);
        deepEqual(this.observed.__listeners['boo'], [
            [this.observer1.foo, this.observer1, undefined],
            [this.observer2.foo, this.observer2, [1, 'two']]
            ]);
    });

    test('__observed', 2, function() {
        this.observed.bind('boo', this.observer1.foo, this.observer1);
        strictEqual(this.observer1.__observed, undefined);

        this.observer2.__observed = [];
        this.observed.bind('boo', this.observer2.foo, this.observer2, [1, 'two']);
        deepEqual(this.observer2.__observed['boo'], [
            [this.observed, this.observer2.foo, [1, 'two']]
            ]);
    });

    /*
     * Trigger
     */

    module('Trigger', {setup: function() {
        this.log = [];
        var that = this;

        this.observed = new jsd.core.Observed();
        this.observer1 = {
            foo: function() { that.log.push([this, 'foo', Array.prototype.slice.call(arguments)]) },
            bar: function() { that.log.push([this, 'bar', Array.prototype.slice.call(arguments)]) }
        };
        this.observer2 = {
            foo: function() { that.log.push([this, 'foo', Array.prototype.slice.call(arguments)]) },
            bar: function() { that.log.push([this, 'bar', Array.prototype.slice.call(arguments)]) }
        };
        this.observed.bind('boo', this.observer1.foo, this.observer1, ['call']);
        this.observed.bind('hoo', this.observer1.foo, this.observer1, ['it']);
        this.observed.bind('boo', this.observer1.bar, this.observer1, ['a']);
        this.observed.bind('boo', this.observer2.foo, this.observer2, ['draw?']);
    }, teardown: function() {
        delete this.log;
        delete this.observed;
        delete this.observer1;
        delete this.observer2;
    }});

    test('simple', 2, function() {
        this.observed.trigger('boo');
        deepEqual(this.log, [
            [this.observer1, 'foo', ['call']],
            [this.observer1, 'bar', ['a']],
            [this.observer2, 'foo', ['draw?']]
            ]);

        delete this.log;
        this.log = [];
        this.observed.trigger('hoo');
        deepEqual(this.log, [
            [this.observer1, 'foo', ['it']]
            ]);
    });

    /*
     * Unbind
     */

    module('Unbind', {setup: function() {
        this.log = [];
        var that = this;

        this.observed = new jsd.core.Observed();
        this.observer1 = {
            __observed: [],
            name: 'observer1',
            foo: function() { that.log.push([this, 'foo', Array.prototype.slice.call(arguments)]) },
            bar: function() { that.log.push([this, 'bar', Array.prototype.slice.call(arguments)]) }
        };
        this.observer2 = {
            __observed: [],
            name: 'observer2',
            foo: function() { that.log.push([this, 'foo', Array.prototype.slice.call(arguments)]) },
            bar: function() { that.log.push([this, 'bar', Array.prototype.slice.call(arguments)]) }
        };
        this.observed.bind('boo', this.observer1.foo, this.observer1, ['call']);
        this.observed.bind('hoo', this.observer1.foo, this.observer1, ['it']);
        this.observed.bind('boo', this.observer1.bar, this.observer1, ['a']);
        this.observed.bind('boo', this.observer2.foo, this.observer2, ['draw?']);
    }, teardown: function() {
        delete this.log;
        delete this.observed;
        delete this.observer1;
        delete this.observer2;
    }});

    test('specific', 4, function() {
        this.observed.unbind('hoo', this.observer1.foo, this.observer1, ['it']);
        deepEqual(this.observed.__listeners['hoo'], []);
        deepEqual(this.observer1.__observed['hoo'], []);

        this.observed.unbind('boo', this.observer1.bar, this.observer1, ['a']);
        deepEqual(this.observed.__listeners['boo'], [
            [this.observer1.foo, this.observer1, ['call']],
            [this.observer2.foo, this.observer2, ['draw?']]
            ]);
        deepEqual(this.observer1.__observed['boo'], [
            [this.observed, this.observer1.foo, ['call']]
            ]);
    });

    test('method agnostic', 4, function() {
        this.observed.bind('boo', this.observer1.foo, this.observer1, ['a']);
        this.observed.unbind('boo', undefined, this.observer1, ['a']);

        deepEqual(this.observed.__listeners['hoo'], [ [this.observer1.foo, this.observer1, ['it']] ]);
        deepEqual(this.observed.__listeners['boo'], [
            [this.observer1.foo, this.observer1, ['call']],
            [this.observer2.foo, this.observer2, ['draw?']]
            ]);
        deepEqual(this.observer1.__observed['boo'], [ [this.observed, this.observer1.foo, ['call']] ]);
        deepEqual(this.observer1.__observed['hoo'], [ [this.observed, this.observer1.foo, ['it']] ]);
    });

    test('argument agnostic', 4, function() {
        this.observed.bind('boo', this.observer1.foo, this.observer1, ['no.']);
        this.observed.unbind('boo', this.observer1.foo, this.observer1);

        deepEqual(this.observed.__listeners['hoo'], [ [this.observer1.foo, this.observer1, ['it']] ]);
        deepEqual(this.observed.__listeners['boo'], [
            [this.observer1.bar, this.observer1, ['a']],
            [this.observer2.foo, this.observer2, ['draw?']]
            ]);
        deepEqual(this.observer1.__observed['boo'], [ [this.observed, this.observer1.bar, ['a']] ]);
        deepEqual(this.observer1.__observed['hoo'], [ [this.observed, this.observer1.foo, ['it']] ]);
    });

    test('agnostic', 4, function() {
        this.observed.unbind('boo', undefined, this.observer1);

        deepEqual(this.observed.__listeners['hoo'], [ [this.observer1.foo, this.observer1, ['it']] ]);
        deepEqual(this.observed.__listeners['boo'], [ [this.observer2.foo, this.observer2, ['draw?']] ]);
        deepEqual(this.observer1.__observed['boo'], []);
        deepEqual(this.observer1.__observed['hoo'], [ [this.observed, this.observer1.foo, ['it']] ]);
    });
});
