// TODO
//  __observed_purge() factory
//  unbind all

jsd.core.Observed = Object.subClass({
    bind: function(event, method, context, args) {
        // method has to be defined
        if (method === undefined)
            throw new Error('observer method can\'t be undefined');

        // add command to listeners (format: [method, observer, arguments])
        if (this.__listeners === undefined)
            this.__listeners = [];
        if (this.__listeners[event] === undefined)
            this.__listeners[event] = [];
        this.__listeners[event].push([method, context, args]);

        // update context object's __observed list, if it exists (format: [observed object, method, arguments])
        if (context !== undefined && context.__observed !== undefined) {
            if (context.__observed[event] === undefined)
                context.__observed[event] = [];
            context.__observed[event].push([this, method, args]);
        };

        // It's the observer's resposibility to prepare the __observed array,
        // and more importantly, to clean up it's bindings using .unbind() once
        // it reaches the end of it's lifecycle.
    },

    unbind: function(event, method, context, args) {
        var filter_listeners, filter_observed;
        var observed = this;

        // define filter functions
        if (method !== undefined)
            if (args !== undefined) {
                filter_listeners = function(command) { return !(command[0] === method && command[1] === context  && jsd.util.list_compare(command[2], args)); };
                filter_observed  = function(command) { return !(command[1] === method && command[0] === observed && jsd.util.list_compare(command[2], args)); };
            } else {
                filter_listeners = function(command) { return !(command[0] === method && command[1] === context); };
                filter_observed  = function(command) { return !(command[1] === method && command[0] === observed); };
            }
        else
            if (args !== undefined) {
                filter_listeners = function(command) { return !(command[1] === context  && jsd.util.list_compare(command[2], args)); };
                filter_observed  = function(command) { return !(command[0] === observed && jsd.util.list_compare(command[2], args)); };
            } else {
                filter_listeners = function(command) { return !(command[1] === context); };
                filter_observed  = function(command) { return !(command[0] === observed); };
            };

        // remove from listeners
        if (this.__listeners !== undefined)
            this.__listeners[event] = this.__listeners[event].filter(filter_listeners);

        // remove from observer's evidence
        if (context !== undefined && context.__observed !== undefined && context.__observed[event] !== undefined)
            context.__observed[event] = context.__observed[event].filter(filter_observed);
    },

    trigger: function(event) {
        // console.log('trigger: ' + event, this);
        if (this.__listeners === undefined)
            return;
        var list = this.__listeners[event]; 
        for (var i in list) {
            var method = list[i][0];
            var context = list[i][1] || window;
            var args = list[i][2] || [];
            // console.log('   apply', context, method, args);
            method.apply(context, args);
        };
    },
});
