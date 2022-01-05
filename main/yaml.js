import yaml from 'js-yaml';
import fs from 'fs';

export const read = (yamlFile) => {
	return yaml.load(fs.readFileSync(yamlFile));
};
export const write = (data, yamlFile) => {
	fs.writeFileSync(yamlFile, yaml.dump(data, {lineWidth: 180}));
};
