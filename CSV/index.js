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
 * @param {Object[]} data
 * @param {string[]} [fields] csv header
 * @param {Object} [opts] Options
 */
export const ToFile = ({data, fields}, opts = {}) => {

    const options = Object.assign({
        newline: '\n'
    }, opts)
    if (!fields) {
        // This iterates over data, thus low in performance
        const duplicatedFields = data.map(_ => (Object.keys(_)))
            .reduce((sum, _) => sum.concat(_), [])
        fields = [...new Set(duplicatedFields)]
    }

    return papaParse.unparse({
        data, fields
    }, options);


};
