const { Router } = require("express");
const {adminModel} = require("../db");
const adminRouter = Router();


const bcrypt  = require("bcrypt");
const {z}  = require("zod");
const jwt  = require("jsonwebtoken");

const {JWT_ADMIN_PASSWORD} = require("../config");



adminRouter.post("/signup", async function (req, res){
    const reqBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(8).max(100),
        firstName: z.string().min(2).max(100),
        lastName: z.string().min(2).max(100)
    })
    const parsedData = reqBody.safeParse(req.body);
    if (!parsedData.success){
        res.json({
            message: "Incorrect format"
        })
        return
    }

    try{
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        const hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        res.json({
            message: "Signed up successfully"
        })
        
    }catch(e){
        res.status(500).json({
            message: "Error while signing up"
        })
    }

})

adminRouter.post("/signin", async function (req, res){

    const {email, password} = req.body;

    const admin = await adminModel.findOne({
        email: email,
    });
    const passwordMatch = await bcrypt.compare(password, admin.password);


    if (admin && passwordMatch){
        const token = jwt.sign({
            id: admin._id.toString()
        }, JWT_ADMIN_PASSWORD);


        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})


// create a course
adminRouter.post("/course", adminMiddleware, async function (req, res){
    const adminId = req.userId;
    const {title, description, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })


})

// Updating a course
adminRouter.put("/course", adminMiddleware, async function (req, res){
    const adminId = req.userId;
    const {title, description, imageUrl, price, courseId} = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

// See all courses
adminRouter.get("/course/bulk", adminMiddleware, async function (req, res){
    const adminId = req.userId;

    const courses = await courseModel.findOne({
        creatorId: adminId
    })

    res.json({
        message: "All courses",
        courses
    })
})

module.exports = {
    adminRouter : adminRouter
}