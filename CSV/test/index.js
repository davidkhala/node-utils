import path from 'path';
import {filedirname} from '@davidkhala/light/es6.mjs';
import * as assert from 'assert';
import download from 'download';
import {FromFile, ToFile} from '../index.js';
import decompress from 'decompress';
import decompressUnzip from 'decompress-unzip';
import fs from 'fs';
import _ from 'lodash';
import papaParse from 'papaparse';

filedirname(import.meta);
describe('FromFile', () => {

    it('dummy', () => {
        const recoveredMatrix = FromFile(path.resolve(__dirname, 'dummy.csv'));
        console.info(recoveredMatrix);
    });
    it('HRDataset_v14.csv', async () => {
        const url = 'https://www.kaggle.com/api/v1/datasets/download/rhuebner/human-resources-data-set';
        const zipDir = __dirname;
        await download(url, zipDir);

        const zipPath = path.resolve(zipDir, 'human-resources-data-set.zip');
        const csvDir = __dirname;
        await decompress(zipPath, csvDir, {plugins: [decompressUnzip()]});

        const cvsPath = path.resolve(csvDir, 'HRDataset_v14.csv');
        const recoveredMatrix = FromFile(cvsPath);
        console.info(recoveredMatrix);
        // cleanup
        fs.unlinkSync(cvsPath);
        fs.unlinkSync(zipPath);
    });


});

describe('ToFile', () => {
    it('inflateHeader', () => {

        const data = [{a: 'b', c: 'd'}, {a: 'b', c: 'd', Column1: 'foo', Column2: 'bar',}, {
            a: 'b',
            c: 'd',
            Column1: 'foo',
            Column2: 'bar',
        }];
        const data2 = _.cloneDeep(data);
        const expected1 = `a,c,Column1,Column2
b,d,,
b,d,foo,bar
b,d,foo,bar`;
        assert.strictEqual(ToFile(data, undefined, true), expected1);

        assert.strictEqual(ToFile(data2), 'a,c\nb,d\nb,d\nb,d');
    });
    it('empty data array', () => {
        const recoveredCSV = ToFile([]);
        assert.strictEqual(recoveredCSV, '');
        assert.strictEqual(papaParse.unparse([]), '');
    });
    it('undefined value', () => {
        const data = [{a: null}];
        const recoveredCSV = ToFile(data);
        const expect1 = 'a\n';
        assert.strictEqual(recoveredCSV, expect1);
    });
});



