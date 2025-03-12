"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminOrModerator = exports.isAdmin = void 0;
const httpStatus_constants_1 = require("../constants/httpStatus.constants");
const isAdmin = (req, res, next) => {
    var _a;
    if (req.user && ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role_code) !== 'ADMIN') {
        res.status(httpStatus_constants_1.HTTP_STATUS.FORBIDDEN).json({
            err: 1,
            message: 'You are not allowed to access this route',
        });
    }
    next();
};
exports.isAdmin = isAdmin;
const isAdminOrModerator = (req, res, next) => {
    var _a, _b;
    if (req.user && ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role_code) !== 'ADMIN' && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role_code) !== 'MODERATOR') {
        res.status(httpStatus_constants_1.HTTP_STATUS.FORBIDDEN).json({
            err: 1,
            message: 'You are not allowed to access this route, please login with admin or moderator account',
        });
    }
    next();
};
exports.isAdminOrModerator = isAdminOrModerator;
