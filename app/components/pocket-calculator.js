import Ember from 'ember';
import Calculator from '../managers/calculator';

const MAX_DISPLAY_WIDTH = 6;
const DEFAULT_DISPLAY_FONT_SIZE = 2;

export default Ember.Component.extend(Ember.Evented, {

    // Ember component specific properties for css/html.
    tagName: 'div',
    classNames: 'calculator',
    attributeBindings: ['tabindex'],
    tabindex: 0,

    display: {
        value: '0',

        // Indicates whether the display is showing the result of a calculation,
        // or input from the user.
        isInput: true
    },
    calculator: new Calculator(),

    onDisplayValueChange: function () {
        const count = this.get('display.value').length;

        if ( count > MAX_DISPLAY_WIDTH )
        {
            const newFontSize = DEFAULT_DISPLAY_FONT_SIZE - ((count - MAX_DISPLAY_WIDTH)*0.1);
            Ember.$(this.get('element')).find('.display').css('font-size', newFontSize + 'em');
        }
        else {

            // Reset.
            Ember.$(this.get('element')).find('.display').css('font-size', DEFAULT_DISPLAY_FONT_SIZE + 'em');
        }

    }.observes('display.value'),

    addOperand() {
        const value = this.get('display.value');

        let parsedValue;

        if (value.indexOf('.') > -1)
        {
            parsedValue = parseFloat(value, 10);
        }
        else
        {
            parsedValue = parseInt(value, 10);
        }

        this.get('calculator').addOperand(parsedValue, 10);
    },

    showResult(result) {
        this.set('display.value', result.toString());
        this.set('display.isInput', false);
    },

    keyPress (e) {
        this.trigger('keypress:' + e.charCode, e);
    },

    actions: {
        // Appends 0-9, or .
        appendInput (input) {

            if (!this.get('display.isInput')) {
                this.set('display.value', '');
                this.set('display.isInput', true);
            }

            // No leading 0s.
            if (this.get('display.value') === '0') {
                this.set('display.value', input);
                return;
            }

            // Make deicmals unique.
            if (input === '.' && this.get('display.value').indexOf('.') > -1) {
                return;
            }

            // Append.
            this.set('display.value', this.get('display.value') + input);
        },

        setOperation (operation) {
            this.addOperand();
            const result = this.get('calculator').setOperation(operation);
            this.showResult(result);
        },

        calculate () {
            if (this.get('display.isInput')) this.addOperand();

            const result = this.get('calculator').calculate();

            this.showResult(result);
        },

        clear () {
            this.set('display.value', '0');
            this.set('display.isInput', true);
            this.get('calculator').clear();
        }
    }
});
