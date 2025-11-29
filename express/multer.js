import Multer from 'multer';
export function formDataRouter (cacheDir, fileSize) {
    const options = {
        dest: cacheDir,
        limits: {}
    };

    if (Number.isInteger(fileSize) && fileSize > 0) {
        options.limits.fileSize = fileSize; // Compliant value: 8000000
    }

    const multerCache = Multer(options);
    return multerCache.any();
};
export const formDataFilePaths = (req, property) => {
    return req.files[property].map(({path}) => path);
};