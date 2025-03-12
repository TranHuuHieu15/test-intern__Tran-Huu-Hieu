"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const handleError_middlewares_1 = require("../middlewares/handleError.middlewares");
const router = (app) => {
    app.use('/auth', auth_routes_1.default);
    app.use('/user', user_routes_1.default);
    // Middleware xử lý lỗi 404
    app.use('*', handleError_middlewares_1.NotFoundError);
    // middlesware xử lý lỗi tập trung
    app.use(handleError_middlewares_1.ErrorHandler);
};
exports.default = router;
