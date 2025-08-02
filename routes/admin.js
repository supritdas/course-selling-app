const { Router } = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");


adminRouter.post("/signup", function (req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post("/signin", function (req, res){
    res.json({
        message: "signin endpoint"
    })
})

// adminRouter.use(adminMiddleware);

adminRouter.post("/course", function (req, res){
    res.json({
        message: "create course"
    })
})

adminRouter.put("/course", function (req, res){
    res.json({
        message: "create course"
    })
})

adminRouter.get("/course/bulk", function (req, res){
    res.json({
        message: "create course"
    })
})

module.exports = {
    adminRouter : adminRouter
}