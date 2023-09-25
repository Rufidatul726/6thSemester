const express = require('express');


// Handle 404 errors
const handle404 = (req, res, next) => {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
}

// Handle 500 errors
const handle500 = (error, req, res, next) => {
    res.status(error.status || 500).send(error.message || 'Internal Server Error');
}

module.exports = {
    handle404,
    handle500
}
