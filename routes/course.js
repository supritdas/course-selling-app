const { Router } = require("express");
const {courseModel} = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase", function (req, res){
    res.json({
        message: "buy courses"
    })
})

courseRouter.get("/preview", function(req, res){
    res.json({
        message: "all courses"
    })
})

module.exports = {
    courseRouter : courseRouter
}