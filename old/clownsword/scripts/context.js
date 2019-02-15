var AudioContext = (AudioContext || webkitAudioContext);
var baseContext = new AudioContext();

function proxyFunction(prop) {
    return function() {
        return this.parentContext[prop].apply(this.parentContext, arguments);
    };
}

function proxyProperty(obj, prop) {
    Object.defineProperty(obj, prop, {
        get: function() {
            return this.parentContext[prop];
        }
    });
}

function CustomAudioContext(audioContext, includeExtendedProperties) {
    if (!(this instanceof CustomAudioContext)) {
        if (audioContext && (audioContext instanceof CustomAudioContext)) {
            return Object.create(audioContext);
        }

        return new CustomAudioContext(audioContext, includeExtendedProperties);
    }

    this.parentContext = audioContext || baseContext;
    this.parentDelayNode = null;

    if (audioContext && includeExtendedProperties) {
        for (var prop in audioContext) {
            if (prop in audioContext) {
                this[prop] = audioContext[prop];
            }
        }
    }
}
var customAudioPrototype = CustomAudioContext.prototype;
customAudioPrototype.constructor = CustomAudioContext;

for (var prop in baseContext) {
    if (typeof baseContext[prop] == 'function') {
        customAudioPrototype[prop] = proxyFunction(prop);
    }
}

proxyProperty(customAudioPrototype, 'currentTime');
proxyProperty(customAudioPrototype, 'sampleRate');
proxyProperty(customAudioPrototype, 'destination');
proxyProperty(customAudioPrototype, 'listener');

customAudioPrototype.decodeAudioData = function(response, successFn, failureFn) {
    console.log('decodeAudioData (debug)');
    return this.parentContext.decodeAudioData.call(this.parentContext, response, successFn, failureFn);
};

customAudioPrototype.createWaveShaper = function() {
    console.log('createWaveShaper (debug)');

    var node = this.parentContext.createWaveShaper.apply(this.parentContext);
    var connectFn = node.connect;

    node.connect = function(node) {
        console.log(this.constructor.name + ' -> ' + node.constructor.name);
        connectFn.call(this, node);
    };

    return node;
};
customAudioPrototype.createDelay = function() {
    console.log('createDelay (debug)');

    var node = this.parentContext.createDelay.apply(this.parentContext);
    var connectFn = node.connect;

    node.connect = function(node) {
        console.log(this.constructor.name + ' -> ' + node.constructor.name);
        connectFn.call(this, node);
    };

    return node;
};