"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Tìm xem user đã tồn tại chưa
    const userExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (userExist) {
        return {
            error: 1,
            message: 'User already exists',
        };
    }
    // Mã hóa mật khẩu
    const salt = Number.parseInt(process.env.SALT || '10');
    const hashPassword = yield bcrypt_1.default.hash(data.password, salt);
    // Tạo user mới
    return yield prisma_1.default.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashPassword,
            role_code: data.role_code,
        },
    });
});
exports.register = register;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Tìm user theo email
    const userExist = yield prisma_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!userExist) {
        return {
            error: 1,
            message: 'User not found',
        };
    }
    // So sánh mật khẩu
    const isMatch = yield bcrypt_1.default.compare(password, userExist.password);
    const JWT_SECRET = process.env.JWT_SECRET || 'love_NodeJS';
    console.log(process.env.JWT_SECRET);
    if (isMatch) {
        let token = jsonwebtoken_1.default.sign({ id: userExist.id, email: userExist.email, role_code: userExist.role_code }, JWT_SECRET, { expiresIn: '3 Days' });
        return Object.assign(Object.assign({}, userExist), { password: 'hidden', token: token });
    }
    else {
        return {
            error: 1,
            message: 'Password or Email is incorrect',
        };
    }
});
exports.login = login;
