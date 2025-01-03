import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

const authUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (User && (await user.matchPassword(password))) {
            
            let token = jwt.sign({ userId: user._id }, "12345", {
                expiresIn: "1d",
            });

            res.cookie("jwt", token, {
                httpOnly: true, //after login , jwt is stored in the frontend's cookies as httponly cookies request after login will be attached with the jwt token stored in the cookies.
                secure: false,
                sameSite: "strict", //prevents csrf attacks
                maxAge: 60 * 60 * 1000, //1 day in milliseconnds
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
    } catch (err) {
        next(err);
    }
}

export { registerUser, authUser }