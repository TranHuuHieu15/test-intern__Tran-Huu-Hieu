import express from "express";
import userRouter from "./user.routes";
import { NotFoundError, ErrorHandler } from "../middlewares/handleError.middlewares";

const router = (app: express.Application) => {
    app.use("/user", userRouter);

    // Middleware xử lý lỗi 404
    app.use("*", NotFoundError);

    // middlesware xử lý lỗi tập trung
    app.use(ErrorHandler);
};

export default router;