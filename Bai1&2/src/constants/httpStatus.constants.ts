const HTTP_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const HTTP_MESSAGE = {
  SUCCESS: "Thành công",
  BAD_REQUEST: "Yêu cầu không hợp lệ",
  UNAUTHORIZED: "Không có quyền truy cập",
  FORBIDDEN: "Bị cấm",
  NOT_FOUND: "Không tìm thấy",
  SERVER_ERROR: "Lỗi máy chủ",
  ROUTES_NOT_DEFINED: "This route is not defined",
};

export { HTTP_STATUS, HTTP_MESSAGE };
