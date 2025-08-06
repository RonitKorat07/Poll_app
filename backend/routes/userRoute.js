import express from 'express'
import User from '../model/User.js';
import { generateToken, jwtauthmiddleware } from '../middleware/jwt.js';

const userRouter = express.Router();


userRouter.post('/signup', async (req, res) => {
    try {
        const data = req.body; //data from body

        const alreadyExists = await User.findOne({ email: data.email });
        
        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User already signed up with this email"
            });
        }
        const newUser = new User(data)
        const response = await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User Registor Success',
            response: response
        })
    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json("Please Check Your Username And Password")
        }

        const payload = {
            id: user.id,
            name: user.name,
            role : user.role
        }
        const token = generateToken(payload)

        res.status(201).json({
            sucess: true,
            message: "Login Success",
            token: token
        })

    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

userRouter.get('/profile', jwtauthmiddleware, async (req, res) => {
    try {
        const userData = await req.user

        const user = await User.findById(userData.id)
        res.status(200).json({
            success: true,
            message: "Successfully Get USer Data",
            user: user
        })
    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

userRouter.put('/profile/password', jwtauthmiddleware, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)

        const { oldPass, newPass } = req.body
        if (!(await user.comparePassword(oldPass))) {
            return res.status(401).json({
                success : false,
                message : "Old Password Not Match"
            })
        }

        user.password = newPass;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Change Successfully"
        })
    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

userRouter.put('/profile/data', jwtauthmiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, number } = req.body

        const user = await User.findById(userId);

        if(user.name === name && user.email === email && user.number === number){
            return res.status(400).json("Not Any Change in Data")
        }

        const changeData = await User.findByIdAndUpdate(userId, {
            name: name,
            email: email,
            number: number
        },
            { new: true })

        res.status(200).json({
            success : true,
            message : "Data Update Success",
            user : changeData
        })

    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})



export default userRouter;
