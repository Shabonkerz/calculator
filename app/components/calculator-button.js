import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: 'button',
    classNameBindings: ['down:down'],
    attributeBindings: ['key'],
    key: '',

    down: false,

    didInsertElement () {
        const charCode = this.get('key').charCodeAt(0);

        if (charCode !== null)
        {
            this.get('parentView').on('keypress:' + charCode, () => this.get('action')());
        }

    },
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
