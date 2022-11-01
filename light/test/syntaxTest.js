import {splitBySpace} from '../syntax.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import {isArrayEven, isFloat, RegXMatch, removeUndefinedValues} from '../syntax.js';
import assert from 'assert';

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
	it('arrayEvenTest', () => {
		logger.debug(isArrayEven());
		logger.debug(isArrayEven([]));
		logger.debug(isArrayEven([1]));
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
	it('RegX', () => {
		const testReg = (str) => {
			const pattern = /[*|,":<>[\]{}`';()@&$#%]/;
			const flags = 'i';// m|i|g
			const result = RegXMatch(str, pattern, flags);
			logger.info({pattern, str, result});
		};
		testReg('david@mediconcen');
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


