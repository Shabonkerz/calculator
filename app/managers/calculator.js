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
        if (this.operands.left !== null && this.operands.right !== null)
        {
            this.clear();
        }

        if (this.operation !== null && this.operation.type === operationType.binary)
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
            // Finish binary operation if we have one.
            if (this.operation.type === operationType.binary)
            {
                this.calculate();
                this.operands.right = null;
            }

            // No need to save unary operations since they happen immediately.
            this.operation = null;

            // Unary operations operate on the left operand only, but the last
            // operand added may be on the right.
            this.operands.left = this.operands.right || this.operands.left;
            this.operands.right = null;

            return this.calculate(operation);
        }

        if (operation.type === operationType.binary)
        {
            let result;

            if (this.operation !== null && this.operands.left !== null)
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
