const yaml = require('js-yaml');
const fs = require('fs');
exports.read = (yamlFile) => {
	return yaml.load(fs.readFileSync(yamlFile));
};
exports.write = (data, yamlFile) => {
	fs.writeFileSync(yamlFile, yaml.dump(data, {lineWidth: 180}));
};
