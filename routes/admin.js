const { Router } = require("express");
const {adminModel} = require("../db");
const adminRouter = Router();


const bcrypt  = require("bcrypt");
const {z}  = require("zod");
const jwt  = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "secretadmin";



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

// adminRouter.use(adminMiddleware);

adminRouter.post("/", function (req, res){
    res.json({
        message: "create course"
    })
})

adminRouter.put("/", function (req, res){
    res.json({
        message: "create course"
    })
})

adminRouter.get("/bulk", function (req, res){
    res.json({
        message: "create course"
    })
})

module.exports = {
    adminRouter : adminRouter
}