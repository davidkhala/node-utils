const papaParse = require('papaparse');
const fs = require('fs');

const FromFile = (filepath) => {
	const str = fs.readFileSync(filepath).toString();
	const result = papaParse.parse(str);
	return result.data;
};
/**
 * keys of first object populate header row
 * @param data
 * @returns {*}
 */
const ToFile = (data = [{}]) => {
	const fields = data.map(entry => (Object.keys(entry))).reduce((sum, entry) => sum.concat(entry), []);
	if (fields.length > 0) {
		const data1 = data[0];
		for (const field of fields) {
			if (!data1.hasOwnProperty(field)) {
				data1[field] = '';
			}
		}
	}
	return papaParse.unparse(data);
};
module.exports = {FromFile, ToFile};
