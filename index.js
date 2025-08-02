const express = require("express");

const app = express();

app.post("/user/signup", function (req, res){
    res.json({
        message: "signup endpoint"
    })
})

app.post("/user/signin", function (req, res){
    res.json({
        message: "signin endpoint"
    })
})

app.get("/user/purchases", function(req, res){
    res.json({
        message: "User's purchases"
    })
})

app.post("/courses/purchase", function (req, res){
    res.json({
        message: "buy courses"
    })
})

app.get("/courses", function(req, res){
    res.json({
        message: "all courses"
    })
})