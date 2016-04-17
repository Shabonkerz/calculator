const numberRegex = /^\d+.?\d*$/;

class Operation {

    constructor (operation, precedence) {
        this.operation = operation;
        this.precedence = precedence;
    }

    static find (operator) {
        if (!(operator in operationMapping)) {
            return null;
        }

        return operationMapping[operator];
    }
}

const operationMapping = {
    '+': new Operation ( (a, b) => a.valueOf() + b.valueOf(), 1 ),
    '-': new Operation ( (a, b) => a.valueOf() - b.valueOf(), 1 ),
    '*': new Operation ( (a, b) => a.valueOf() * b.valueOf(), 2 ),
    '/': new Operation ( (a, b) => a.valueOf() / b.valueOf(), 2 )
};

class Expression {
    constructor (left, right) {
        this.token = null;
        this.left = left;
        this.right = right;
    }

    valueOf () {
        return this.token;
    }
}

class NumericExpression extends Expression {
    constructor (token, ...args) {
        super(...args);
        this.token = token;
    }
}

class BinaryOperationExpression extends Expression {
    constructor (token, ...args) {
        super(...args);
        this.operation = Operation.find(token);
    }

    valueOf () {
        return this.operation.operation(this.left, this.right);
    }

}

export default class BinaryExpressionTree {

    static fromString (str) {
        const builder = BinaryExpressionTree.build();
        builder.next();

        // Match any number, operator, parentheses.
        const tokens = str.match(/^(-?\d+\.?\d*)|(\+)|(-)|(\/)|(\*)|(\()|(\))|(-?\d+\.?\d*)/g);
        _.forEach(tokens, (token) => {
            builder.next(token);
        });
        return builder.next().value;
    }

    static *build () {
        let operators = [];
        let operands = [];

        const onOperator = (op) => {
            while (operators.length && operators[operators.length - 1] !== '(' && op.precedence <= operators[operators.length - 1]) {
                const operator = operators.pop();
                const right = operands.pop();
                const left = operands.pop();
                operands.push(new BinaryOperationExpression(operator, left, right));
            }

            operators.push(op);
        };

        const onNumber = (number) => {
            operands.push(new NumericExpression(number));
        };

        const onRightParens = () => {
            while (operators.length && operators[operators.length - 1] !== '(') {
                const operator = operators.pop();
                const right = operands.pop();
                const left = operands.pop();
                operands.push(new BinaryOperationExpression(operator, left, right));
            }
            // Pop left parens.
            operators.pop();
        }

        const onLeftParens = () => {
            operators.push('(');
        }

        while (true) {
            const token = yield token;
            const operation = Operation.find(token);

            if (operation) {
                onOperator(token);
            }
            else if (numberRegex.test(token)) {
                onNumber(token.indexOf('.') > -1 ? parseFloat(token, 10) : parseInt(token, 10));
            }
            else if (token === '(') {
                onLeftParens();
            }
            else if (token === ')') {
                onRightParens(')');
            }
            // End we've reached the end of the line.
            else if (token === null || token === undefined) {
                break;
            }
        }

        while (operators.length) {
            const operator = operators.pop();

            // Ignore unclosed left parentheses.
            if (operator === '(') {
                continue;
            }

            const right = operands.pop();
            const left = operands.pop();
            operands.push(new BinaryOperationExpression(operator, left, right));
        }

        const result = operands.pop();

        return result;
    }
}
