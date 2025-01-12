import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

const registerUser = async (req, res, next) => {

    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User Already Exists');
        }

        const salt = await bcrypt.genSalt(10);
        const encryptPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: encryptPassword,
        })

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            })

        } else {
            res.status(400);
            throw new Error("Invalid User Data");
        }
    } catch (err) {
        next(err)
    }
};

const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (User && (await user.matchPassword(password))) {

        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });

        res.cookie("jwt", token, {
            httpOnly: true, //after login , jwt is stored in the frontend's cookies as httponly cookies request after login will be attached with the jwt token stored in the cookies.
            secure: false,
            sameSite: "strict", //prevents csrf attacks
            maxAge: 24 * 60 * 60 * 1000, //1 day in milliseconnds
        })

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

const logout = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expiresIn: new Date(0),
    });

    res.status(200).json({ message: " Logged Out Successfully" });
};

export { registerUser, authUser, logout }