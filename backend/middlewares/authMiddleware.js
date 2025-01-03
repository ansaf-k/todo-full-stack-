import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        if (token) {
            try {
                const decoded = jwt.verify(token, "12345");
                req.user = await User.findById(decoded.userId).select("-password");
                next();
            } catch (error) {
                res.status(401);
                throw new Error("NOt Authorized Invalid Token");
            }
        }
        else {
            res.status(401);
            throw new Error("Not Authorized, No Token");
        }
    } catch (error) {
        next(error)
    }
}

export { protect };