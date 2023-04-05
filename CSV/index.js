import papaParse from 'papaparse';
import fs from 'fs';

/**
 * @typedef {Object} Meta
 * @property {string} delimiter
 * @property {string} linebreak
 * @property {boolean} aborted
 * @property {boolean} truncated
 * @property {number} cursor
 * @property {string[]} [fields] optional when dictate `header` in configuration
 */

/**
 * @typedef {Object} CSVError
 * @property {string} type
 * @property {string} code
 * @property {string} message
 */

/**
 *
 * @param filepath
 * @param {boolean} [headerLess]
 * @returns {{data:string[][], meta:Meta, errors:CSVError[]}}
 */
export const FromFile = (filepath, headerLess) => {
	const str = fs.readFileSync(filepath).toString();
	return papaParse.parse(str, {
		header: !headerLess
	});
};
/**
 * keys of first object populate header row
 * @returns {string}
 * @param {[Object]} data
 * @param {Object} opts Options
 * @param {boolean} [discoverFields]
 */
export const ToFile = (data = [{}], opts = {newline: '\r\n'}, discoverFields) => {
	if (discoverFields) {
		const fields = data.map(entry => (Object.keys(entry))).reduce((sum, entry) => sum.concat(entry), []);
		if (fields.length > 0) {
			const data1 = data[0];
			for (const field of fields) {
				if (!data1[field]) {
					data1[field] = '';
				}
			}
		}
	} else {
		// case: first row as header
		// case: data = {fields, data}
		// rely on papaParse:do nothing
	}


	return papaParse.unparse(data, opts);
};
