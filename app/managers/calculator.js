
const operationMapping = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
        if (b === 0)
        {
            throw new Error('Division by zero.');
        }
        return a / b;
    }
};

// TODO: Clean, and add jsdocs.
export default class Calculator {

    constructor () {
        this.operands = {
            left: null,
            right: null
        };
        this.operation = null;
    }

    addOperand (operand) {
        // NOTE: Last stopping point.
        if (this.operands.left !== null && this.operands.right !== null)
        {
            this.clear();
        }

        if (this.operation !== null)
        {
            this.operands.right = operand;
            return;
        }

        this.operands.left = operand;
    }

    setOperation (operation) {
        let result;

        if (this.operation !== null && this.operands.left !== null && this.operands.right !== null )
        {
            result = this.calculate();
        }
        else
        {
            result = this.operands.left;
        }

        this.operation = operation;

        return result;
    }

    calculate ()
    {
        // TODO: Handle cases when one or more operands or operation is null.

        if (operationMapping[this.operation] === undefined)
        {
            throw new Error('Operation not supported.');
        }

        const result = operationMapping[this.operation](this.operands.left, this.operands.right || this.operands.left);

        this.operands.left = result;
        return result;
    }

    clear ()
    {
        this.operands = {
            left: null,
            right: null
        };

        this.operation = null;
    }
}
