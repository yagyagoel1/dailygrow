import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/tokenHandler.js";







export const verifyUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.user = null;
        return next()
    }
    const decoded = verifyToken(token);
    if (!decoded) {
       res.status(401).clearCookie("token").json({message: 'Invalid token'});
    }
    req.user = decoded;
    next();
});
