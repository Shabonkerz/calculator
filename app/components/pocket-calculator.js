import Ember from 'ember';
import Calculator from '../managers/calculator';

export default Ember.Component.extend({
    display: {
        value: '0',

        // Indicates whether the display is showing the result of a calculation,
        // or input from the user.
        isInput: true
    },
    calculator: new Calculator(),

    addOperand() {
        this.get('calculator').addOperand(parseInt(this.get('display.value'), 10));
    },

    showResult(result) {
        this.set('display.value', result);
        this.set('display.isInput', false);
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

            // TODO: Handle errors.
            const result = this.get('calculator').calculate();

            this.showResult(result);
        },

        clear () {
            this.set('display.value', '0');
            this.get('calculator').clear();
        }
    }
});
