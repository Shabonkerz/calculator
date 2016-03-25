import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: 'button',
    classNameBindings: ['down:down'],

    down: false,

    mouseDown () {
        this.set('down', true);
    },
    mouseUp () {
        this.set('down', false);
    },
    mouseLeave () {
        this.set('down', false);
    },
    click () {
        this.get('action')();
    }
});
