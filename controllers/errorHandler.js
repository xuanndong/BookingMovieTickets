const errorHandler = (err, req, res, next) => {
    console.log(err);

    if (res.headerSent) {
        return next(err);
    }
    const status = err.status || 500;
    const name = err.name || "Internal Server Error";
    res.status(status);
    res.send(`${name}: ${err.message} with the status of ${status}`);
};

export default errorHandler;
