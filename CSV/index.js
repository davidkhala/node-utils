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
 * @param {string} [delimiter]
 * @returns {{data:string[][], meta:Meta, errors:CSVError[]}}
 */
export const FromFile = (filepath, headerLess, delimiter) => {
    const str = fs.readFileSync(filepath).toString();
    return papaParse.parse(str, {
        header: !headerLess,
        delimiter
    });
};
/**
 * @returns {string}
 * @param {[Object]} data
 * @param {Object} [opts] Options
 * @param [inflateHeader]
 */
export const ToFile = (data = [{}], opts = { newline: '\n' }, inflateHeader) => {

    if (inflateHeader) {
        // This iterates over data, thus low in performance

        const fields = data.map(entry => (Object.keys(entry))).reduce((sum, entry) => sum.concat(entry), []);
        // Array.concat cannot guarantee element unique. But papaparse will create the magic

        if (fields.length > 0) {
            const data1 = data[0];
            for (const field of fields) {
                if (!data1[field]) {
                    data1[field] = '';
                }
            }
        }
    }

    return papaParse.unparse(data, opts);


};
