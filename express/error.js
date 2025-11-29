export function bind(app, onError, logger = console) {
    if (!onError) {
        onError = (err, res) => {
            let status = 500;
            if (err.statusCode) {
                status = err.statusCode;
            } else if (err.status) {
                status = err.status;
            }
            res.status(status);
            res.send(err);
        };
    }
    app.use((err, req, res, next) => {
        logger.error(err);
        if (res.headersSent) {
            logger.error(`error happened after res.headersSent=${res.headersSent}`);
            return next(err);
        }
        onError(err, res);
    });
}