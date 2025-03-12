"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const HOST = process.env.HOST || 3000;
app.use(express_1.default.json()); // for parsing application/json
(0, routes_1.default)(app);
app.listen(HOST, () => {
    console.log(`Server is running on port http://localhost:${HOST}`);
});
