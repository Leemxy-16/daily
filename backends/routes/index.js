const { adminRouter } = require("./adminroutes")
const authRouter = require("./authroutes")
const usersRouter = require("./userroutes")

const router = require("express").Router

const baseRouter = router()

baseRouter.use("/auth", authRouter)
baseRouter.use("/users", usersRouter)
baseRouter.use("/admin", adminRouter)
module.exports = baseRouter