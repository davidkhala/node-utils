const yaml = require('js-yaml');
const fs = require('fs');
exports.read = (yamlFile) => {
	return yaml.safeLoad(fs.readFileSync(yamlFile));
};
exports.write = (data, yamlFile) => {
	fs.writeFileSync(yamlFile, yaml.safeDump(data, {lineWidth: 180}));
};
