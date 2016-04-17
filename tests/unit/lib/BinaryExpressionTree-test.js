import BinaryExpressionTree from 'calculator/lib/BinaryExpressionTree';
import { describe, it } from 'mocha';
import { assert } from 'chai';

describe('BinaryExpressionTree', () => {
	describe('build', () => {
		it('should create a simple operation with 1+1', () => {
			const builder = BinaryExpressionTree.build();

			builder.next();
			builder.next('1');
			builder.next('+');
			builder.next('1');

			const result = builder.next().value;

			assert.notEqual(result, null);
			assert.equal(result.valueOf(), 2);
		});
		it('should create a simple operation with 1-1', () => {
			const builder = BinaryExpressionTree.build();

			builder.next();
			builder.next('1');
			builder.next('-');
			builder.next('1');

			const result = builder.next().value;

			assert.notEqual(result, null);
			assert.equal(result.valueOf(), 0);
		});

		it('should create a simple operation with 1+1*2', () => {
			const builder = BinaryExpressionTree.build();

			builder.next();
			builder.next('1');
			builder.next('+');
			builder.next('1');
			builder.next('*');
			builder.next('2');

			const result = builder.next().value;

			assert.notEqual(result, null);
			assert.equal(result.valueOf(), 3);
		});

		it('should create a simple operation with 1+1*2+1', () => {
			const builder = BinaryExpressionTree.build();

			builder.next();
			builder.next('1');
			builder.next('+');
			builder.next('1');
			builder.next('*');
			builder.next('2');
			builder.next('+');
			builder.next('1');
			const result = builder.next().value;

			assert.notEqual(result, null);
			assert.equal(result.valueOf(), 4);
		});
	});
	describe('fromString', () => {
		it('should build a simple expression tree from 1+1', () => {
			const result = BinaryExpressionTree.fromString('1+1');

			assert.equal(result.valueOf(), 2);
		});
		it('should build a simple expression tree from 1-1', () => {
			const result = BinaryExpressionTree.fromString('1-1');

			assert.equal(result.valueOf(), 0);
		});
		it('should build a simple expression tree from 1+1*2', () => {
			const result = BinaryExpressionTree.fromString('1+1*2');

			assert.equal(result.valueOf(), 3);
		});
		it('should build a simple expression tree from 1+1*2+1', () => {
			const result = BinaryExpressionTree.fromString('1+1*2+1');

			assert.equal(result.valueOf(), 4);
		});
		it('should build a simple expression tree from (1+1)', () => {
			const result = BinaryExpressionTree.fromString('(1+1)');

			assert.equal(result.valueOf(), 2);
		});
		it('should build a simple expression tree from (1+1)*2', () => {
			const result = BinaryExpressionTree.fromString('(1+1)*2');

			assert.equal(result.valueOf(), 4);
		});
		it('should ignore open parentheses(left, no right): (3+3*3', () => {
			const result = BinaryExpressionTree.fromString('(3+3*3');

			assert.equal(result.valueOf(), 12);
		});
		it('should ignore open parentheses(no left, right): 3+3*3)', () => {
			const result = BinaryExpressionTree.fromString('3+3*3)');

			assert.equal(result.valueOf(), 12);
		});
	});
});
