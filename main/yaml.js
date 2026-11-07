import {load, dump} from 'js-yaml';
import fs from 'node:fs';

export const read = (yamlFile) => {
	return load(fs.readFileSync(yamlFile, 'utf8'));
};
export const write = (data, yamlFile) => {
	fs.writeFileSync(yamlFile, dump(data, {lineWidth: 180}));
};
