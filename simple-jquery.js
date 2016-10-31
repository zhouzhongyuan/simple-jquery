var domElement = function (selector) {
    this.selector = selector || null;   //The selector being targeted
    this.element = null;    // The actual DOM element
}
domElement.prototype.eventHandler = {
    events: [],  // Array of events & callbacks the element is ubscibed to.
    bindEvent: function (event, callback, targetElement) {
        // remove any duplicate event
        this.unbindEvent(event, targetElement);

        // bind event listener to DOM element
        targetElement.addEventListener(event, callback, false);

        // push the new event into our events array.
        this.events.push({
            type: event,
            event: callback,
            target: targetElement
        })
    },
    // before we can remove an event, we will need a method to find the event  from the "events" array
    findEvent: function(event) {
        return this.events.filter(function(evt){
            return (evt.type === event);
        })[0];
    },
    unbindEvent: function (event, targetElement) {
        // search events
        var foundEvent = this.findEvent(event);
        if(foundEvent !== undefined){
            targetElement.removeEventListener(event, foundEvent.event, false);
        }
        // update the events array
        this.events = this.events.filter(function (evt) {
            return (evt.type !== event);
        })
    }
}
domElement.prototype.on = function (event, callback) {
    this.eventHandler.bindEvent(event, callback, this.element);
}
domElement.prototype.off = function (event, callback) {
    this.eventHandler.unbindEvent(event, callback, this.element);
}
domElement.prototype.val = function (newVal) {
    return (newVal !== undefined ? this.element.value = newVal : this.element.value);
}
domElement.prototype.append = function (html) {
    this.element.innerHTML = this.element.innerHTML + html;
}
domElement.prototype.prepend = function (html) {
    this.element.innerHTML = html + this.element.innerHTML;
}
domElement.prototype.html = function (html) {
    if(html === undefined){
        return this.element.innerHTML;
    }else{
        this.element.innerHTML = html;
    }
}

// init
domElement.prototype.init = function () {
    switch (this.selector[0]){
        case '<':
            // create element
            var matches = this.selector.match(/<([\w-]*)>/);
            if(matches === null || matches === undefined){
                throw 'Invalid Selector / Node';
                return false;
            }
            var nodeName = matches[0].replace('<','').replace('>','');
            this.element = document.createElement(nodeName);
            break;
        default:
            this.element = document.querySelector(this.selector);
    }
}

$ = function (selector) {
    var el = new domElement(selector);
    el.init();
    return el;
}





