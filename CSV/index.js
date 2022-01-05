import papaParse from 'papaparse';
import fs from 'fs';

export const FromFile = (filepath) => {
	const str = fs.readFileSync(filepath).toString();
	const result = papaParse.parse(str);
	return result.data;
};
/**
 * keys of first object populate header row
 * @param data
 * @returns {*}
 */
export const ToFile = (data = [{}]) => {
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
