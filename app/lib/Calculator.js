import BinaryExpressionTree from './BinaryExpressionTree';

const numberRegex = /^\d+.?\d*$/;

class HistoryEntry {
    constructor (expression, result) {

        // String representing the full operation to perform. e.g. '3 * 4 + 8 + 9 - 2'
        this.expression = expression;

        // The result of the calculation.
        this.result = expression.valueOf();
    }
}

const unaryOperations = {
    '+/-': (a) => -a,
    '%': (a) => a / 100
};

export class Display extends TinyEmitter {
    constructor () {
        super();
        this._value = '0';
        this.showingOutput = false;
    }

    get value() {
        return this._value;
    }

    set value (x) {
        this._value = x;
        this.showingOutput = true;
        this.emit('change', this._value);
    }

    clear () {
        this._value = '0';
        this.showingOutput = false;
        this.emit('change', this._value);
    }

    append (char) {
        if (char === '0' && this._value === '0')
        {
            return;
        }

        if ((this._value === '0' || this.showingOutput) && (numberRegex.test(char) || char === '(' || char === ')')) {
            this._value = '';
        }

        this._value += char.toString();
        this.showingOutput = false;
        this.emit('change', this._value);
    }

    transform (op) {
        if (!(op in unaryOperations)) {
            return;
        }

        this._value = unaryOperations[op](this._value.indexOf('.') > -1 ? parseFloat(this._value) : parseInt(this._value)).toString();
        this.showingOutput = false;
        this.emit('change', this._value);
    }
}

export default class Calculator {

    constructor () {
        this.history = [];
        this.display = new Display();
    }

    evaluate () {
        const result = BinaryExpressionTree.fromString(this.display.value);

        if (!this.display.value === '0') {
            this.history.push(new HistoryEntry(result));
        }

        this.display.value = result.valueOf().toString(10);

        return result;
    }

    clear () {
        this.display.clear();
    }
}
