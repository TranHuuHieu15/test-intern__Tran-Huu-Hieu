"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_MESSAGE = exports.HTTP_STATUS = void 0;
const HTTP_STATUS = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};
exports.HTTP_STATUS = HTTP_STATUS;
const HTTP_MESSAGE = {
    SUCCESS: 'Thành công',
    BAD_REQUEST: 'Yêu cầu không hợp lệ',
    UNAUTHORIZED: 'Không có quyền truy cập',
    FORBIDDEN: 'Bị cấm',
    NOT_FOUND: 'Không tìm thấy',
    SERVER_ERROR: 'Lỗi máy chủ',
    ROUTES_NOT_DEFINED: 'This route is not defined',
};
exports.HTTP_MESSAGE = HTTP_MESSAGE;
