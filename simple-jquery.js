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
    }
}