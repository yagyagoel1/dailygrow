import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { store } from "../utils/store.js";
import { v4 as uuidv4 } from 'uuid';
import { createToken } from "../utils/tokenHandler.js";



const  getTasks  = asyncHandler(async (req, res, next) => {
    if(!req.user){
        const id  = uuidv4();
        store[id] = [];
       const token =  createToken(id);
       return  res.status(200)
        .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).json(new ApiResponse(200, 'Tasks fetched successfully', store[id]))
    }
    res.status(200).json(new ApiResponse(200, 'Tasks fetched successfully', store[req.user.userid]));
});




export { getTasks }