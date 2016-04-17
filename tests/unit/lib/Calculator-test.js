import Calculator from 'calculator/lib/Calculator';
import { describe, it } from 'mocha';
import { assert } from 'chai';

describe('Calculator', () => {
	describe('constructor', () => {
		it('should create a new Calculator', () => {
			const calculator = new Calculator();

			assert.deepEqual(calculator.history, []);
		});
	});
});
