const operationType = {
    unary: 1,
    binary: 2
};

class Operation {
    constructor (operation, type) {
        this.operation = operation;
        this.type = type;
    }
}

const operationMapping = {
    '+': new Operation ( (a, b) => a + b, operationType.binary ),
    '-': new Operation ( (a, b) => a - b, operationType.binary ),
    '*': new Operation ( (a, b) => a * b, operationType.binary ),
    '/': new Operation ( (a, b) => a / b, operationType.binary ),
    '%': new Operation ( (a) => a / 100, operationType.unary ),
    '+/-': new Operation ( (a) => a !== 0 ? -1 * a : 0, operationType.unary )
};

// TODO: Clean, and add docblockr comments for jsdocs.
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

    setOperation (op) {

        const operation = operationMapping[op];

        if (operation === undefined)
        {
            throw new Error('Operation not supported.');
        }

        if (operation.type === operationType.unary)
        {
            this.operation = operation;
            return this.calculate();
        }

        if (operation.type === operationType.binary)
        {
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
    }

    calculate ()
    {
        const result = this.operation.operation(this.operands.left, this.operands.right || this.operands.left);

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
