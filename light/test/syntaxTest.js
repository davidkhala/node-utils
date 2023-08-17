import assert from 'assert';
import {findIndexesOf, isCommentOnly, splitBySpace} from '../syntax.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import {isFloat, removeUndefinedValues} from '../syntax.js';
import {captureGroups, match, clone, countGroup, equal} from '../regx.js';
import {intersection, isEven, minus, repeat, union} from '../array.js';

const logger = consoleLogger('syntax test');

describe('test:syntax', () => {
	it('splitBySpace', () => {
		const str = ` 
/home/davidliu/Documents/delphi-fabric/common/bin/configtxlator 
start \
--hostname=0.0.0.0 
--port=7059  
--CORS=* `;
		const tokens = splitBySpace(str);
		logger.debug(tokens);
	});

	it('IsFloat', () => {
		const test = (number) => {
			logger.info(number, 'isFloat', isFloat(number));
		};

		test(1);
		test(0);
		test(null);
		test(undefined);
		test('1');
		test('1.10');
		test(1.10);
		test(1.00);
		assert.strictEqual(Number.isInteger(1.00), true, 'Number.isInteger(1.00) should be true');
	});

	it('removeUndefinedValues', () => {
		const object = {
			'$metadata': {
				httpStatusCode: 200,
				requestId: 'CV1TVHKE5G3RTHOMN72LJKLT6RVV4KQNSO5AEMVJF66Q9ASUAAJG',
				extendedRequestId: undefined,
				cfId: undefined,
				attempts: 1,
				totalRetryDelay: 0
			},
			Table: {
				ArchivalSummary: undefined,
				AttributeDefinitions: [[Object], [Object]],
				BillingModeSummary: undefined,
				CreationDateTime: '2022-10-19T12:22:50.559Z',
				GlobalSecondaryIndexes: undefined,
				GlobalTableVersion: undefined,
				ItemCount: 0,
				KeySchema: [[Object], [Object]],
				LatestStreamArn: undefined,
				LatestStreamLabel: undefined,
				LocalSecondaryIndexes: undefined,
				ProvisionedThroughput: {
					LastDecreaseDateTime: undefined,
					LastIncreaseDateTime: undefined,
					NumberOfDecreasesToday: 0,
					ReadCapacityUnits: 1,
					WriteCapacityUnits: 1
				},
				Replicas: undefined,
				RestoreSummary: undefined,
				SSEDescription: undefined,
				StreamSpecification: undefined,
				TableArn: 'arn:aws:dynamodb:ap-east-1:606262941110:table/TEST_TABLE',
				TableClassSummary: undefined,
				TableId: '046e2a5f-b8b3-4e80-8cc2-25929735ffac',
				TableName: 'TEST_TABLE',
				TableSizeBytes: 0,
				TableStatus: 'ACTIVE'
			}
		};
		const trimmed = removeUndefinedValues(object, true, true);
		console.debug(trimmed);
		removeUndefinedValues(object, true, false);// inline change
		console.debug(object);

	});
});

describe('RegExp', () => {
	it('build and match', () => {
		const str = 'david@mediconcen';
		const source = /[*|,":<>[\]{}`';()@&$#%]/;
		const flags = 'i';// m|i|g
		const regExp = clone({source, flags});
		assert.ok(match(str, regExp));
	});
	it('capture groups', () => {
		const str = 'david@mediconcen';
		const regExp = /^(\S*)@\S*$/;
		const results = captureGroups(str, regExp);
		assert.strictEqual(results[0], 'david');
	});
	it('count group', () => {
		assert.strictEqual(countGroup(/\s*\$\{?(\w*)}?\.([$\w{}]*)\s*;$/), 2);
		assert.strictEqual(countGroup(/drop\s*table/i), 0);
		assert.strictEqual(countGroup(/(?:\$(database)\.)?/), 1);
		assert.strictEqual(countGroup(/(?:\$database\.)?/), 0);
	});
	it('equals', () => {
		assert.ok(equal(/a/, /a/));
	});
	it('nested sample: div', () => {
		//  TODO WIP 下面这个例子可以匹配嵌套的<div>标签
		// const regExp = /<div[^>]*>[^<>]*(((?<Open><div[^>]*>)[^<>]*)+((?'-Open'</div>)[^<>]*)+)*(?(Open)(?!))</div>/i
	});
});
describe('array', () => {
	it('repeat', () => {
		const arr = repeat(2, 100);
		assert.ok(isEven(arr));
	});
	it('isEven', () => {
		assert.ok(!isEven());
		assert.ok(!isEven([]));
		assert.ok(isEven([1]));
	});
	it('union', () => {
		const l1 = [1, 4, 2];
		const l2 = [1, 4, 5];
		const l3 = [0];
		const set = union(l1, l2, l3);
		assert.deepEqual(set, [1, 4, 2, 5, 0]);
	});
	it('minus', () => {
		const a = [1, 4, 5];
		const b = [4, 1];
		const c = minus(a, b);
		assert.strictEqual(c.length, 1);
		assert.strictEqual(c[0], 5);
	});
	it('intersection', () => {
		const a = [1, 4, 5];
		const b = [4, 1];
		const c = intersection(a, b);
		assert.strictEqual(c.length, 2);
		assert.ok(c.includes(1));
		assert.ok(c.includes(4));
	});
	it('findIndexOf', () => {
		const str = 'abcde';
		assert.ok(findIndexesOf(str, 'abc'));
		assert.ok(!findIndexesOf(str, 'ab', 1));

		const shakespeare = 'To be, or not to be, that is the question.';
		const pattern = 'be';

		for (const index of findIndexesOf(shakespeare, pattern)) {
			assert.strictEqual(shakespeare.substring(index, index + pattern.length), pattern);
		}

		const comment = `/*
			abc
		*/`;
		assert.ok(isCommentOnly(comment));


	});
});

