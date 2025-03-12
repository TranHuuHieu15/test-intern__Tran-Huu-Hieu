"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const httpStatus_constants_1 = require("../constants/httpStatus.constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(httpStatus_constants_1.HTTP_STATUS.UNAUTHORIZED).json({ message: 'Please login' });
        return;
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(httpStatus_constants_1.HTTP_STATUS.FORBIDDEN).json({
            message: 'Access token invalid or expired',
        });
        return;
    }
};
exports.verifyToken = verifyToken;
