import Ember from 'ember';
import Calculator from '../managers/calculator';

export default Ember.Component.extend({
    display: '0',
    calculator: new Calculator(),

    // Flag for clearing the display upon next input.
    clearOnInput: false,

    // Indicates whether the display is showing input from user, or output from calculation.
    displayIsResult: false,

    addOperand () {
        this.set('clearOnInput', true);
        this.get('calculator').addOperand(parseInt(this.get('display'), 10));
    },

    showResult (result) {
        this.set('display', result);
        this.set('displayIsResult', true);
    },

    actions: {
        // Appends 0-9, or .
        appendInput (input) {

            if (this.get('displayIsResult'))
            {
                this.set('display', '');
                this.set('displayIsResult', false);
            }

            // No leading 0s.
            if (this.get('display') === '0')
            {
                this.set('display', input);
                return;
            }

            // Append.
            this.set('display', this.get('display') + input);
        },

        setOperation (operation) {
            this.addOperand();
            const result = this.get('calculator').setOperation(operation);
            this.showResult(result);
        },

        calculate () {
            if (!this.get('displayIsResult') ) this.addOperand();

            // TODO: Handle errors.
            const result = this.get('calculator').calculate();

            this.showResult(result);
        },

        clear () {
            this.set('display', '0');
            this.get('calculator').clear();
        }
    }
});
