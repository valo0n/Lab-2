const notFound = (req, res, next) => { res.status(404); next(new Error(`Not Found — ${req.originalUrl}`)); };
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message, ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) });
};
module.exports = { notFound, errorHandler };
