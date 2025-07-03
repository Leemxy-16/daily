const { adminRouter } = require("./adminroutes");
const authRouter = require("./authroutes");
const usersRouter = require("./userroutes");

const { Router } = require("express");
const baseRouter = Router();

baseRouter.use("/auth", authRouter);
baseRouter.use("/users", usersRouter);
baseRouter.use("/admin", adminRouter);

module.exports = baseRouter;
