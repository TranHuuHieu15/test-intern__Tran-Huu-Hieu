"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const services = __importStar(require("../services"));
const httpStatus_constants_1 = require("../constants/httpStatus.constants");
const user_validations_1 = require("../validations/user.validations");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield services.login(email, password);
        if (user.error) {
            //FIXME:
            console.log('================', 'Lỗi ở đây nè');
            res.status(httpStatus_constants_1.HTTP_STATUS.BAD_REQUEST).json({
                err: 1,
                msg: user.message,
            });
            return;
        }
        res.status(httpStatus_constants_1.HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: httpStatus_constants_1.HTTP_MESSAGE.SUCCESS,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = user_validations_1.userSchema.safeParse(req.body);
        if (!validationResult.success) {
            res.status(httpStatus_constants_1.HTTP_STATUS.BAD_REQUEST).json({
                err: 1,
                msg: validationResult.error.errors[0].message,
            });
            return; // nếu có lỗi thì dừng hàm
        }
        const user = yield services.register(validationResult.data);
        res.status(httpStatus_constants_1.HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: httpStatus_constants_1.HTTP_MESSAGE.SUCCESS,
            data: Object.assign(Object.assign({}, user), { password: 'hidden' }),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
