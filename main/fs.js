import walkSync from 'klaw-sync';
import fsExtra from 'fs-extra';

export function listDir(sourceDir, opts = {}, withFileStats) {
	const result = walkSync(sourceDir, Object.assign(opts, {traverseAll: true}));
	if (!withFileStats) {
		return result.map(({path}) => path);
	}
	return result;
}

export function copy(srcDir, destDir, overwrite) {
	fsExtra.copySync(srcDir, destDir, {overwrite});
}
