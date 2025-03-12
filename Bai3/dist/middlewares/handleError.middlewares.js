"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.NotFoundError = void 0;
const httpStatus_constants_1 = require("../constants/httpStatus.constants");
const NotFoundError = (req, res, next) => {
    res.status(httpStatus_constants_1.HTTP_STATUS.NOT_FOUND).json({
        err: 1,
        msg: httpStatus_constants_1.HTTP_MESSAGE.ROUTES_NOT_DEFINED,
    });
};
exports.NotFoundError = NotFoundError;
const ErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(httpStatus_constants_1.HTTP_STATUS.SERVER_ERROR).json({
        err: 1,
        msg: httpStatus_constants_1.HTTP_MESSAGE.SERVER_ERROR,
    });
};
exports.ErrorHandler = ErrorHandler;
