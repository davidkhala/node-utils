import path from 'path';
import {fileURLToPath} from 'url';

if (!global.__dirname) {
	const __filename = fileURLToPath(import.meta.url);
	global.__dirname = path.dirname(__filename);
}
