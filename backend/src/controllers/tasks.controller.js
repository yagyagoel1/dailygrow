import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createNewUser } from "../utils/createUser.js";
import { createTaskSchema, updateTaskSchema } from "../utils/schemas.js";
import { store } from "../utils/store.js";
import { v4 as uuidv4 } from 'uuid';



const  getTasks  = asyncHandler(async (req, res, next) => {
    if(!req.user){
     const token =  await createNewUser()
     return  res.status(200)
      .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none'
      }).json(new ApiResponse(200, 'Tasks fetched successfully', []))
    }
    if(!store[req.user.userid]){//if the store(express) has been reseted, work with previously stored token
        store[req.user.userid]=[]}
    res.status(200).json(new ApiResponse(200, 'Tasks fetched successfully', store[req.user.userid]));
});

const getTaskById= asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    if(!req.user){
        const token =  await createNewUser()
       return res.status(300).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).json(new ApiResponse(400, 'Not Authorized', []))
    }
    if(!store[req.user.userid]){
        store[req.user.userid]=[]}
    const task= store[req.user.userid].find(task=>task.id === id);    
    if(!task){
        return res.status(404).json(new ApiResponse(404, 'Task not found', []))
    }
    res.status(200).json(new ApiResponse(200, 'Task fetched successfully', task));
});

const createTask = asyncHandler(async (req, res, next) => { 
    let {title,description,dueDate,status} = req.body;
    if(!req.user){
        const token =  await createNewUser()
        return res.status(300).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).json(new ApiResponse(400, 'Not Authorized', []))
    }if(!store[req.user.userid]){
        store[req.user.userid]=[]}

    const validate= createTaskSchema({title,description,dueDate,status});
    if(!validate.success){
        return res.status(400).json(new ApiResponse(400, validate.error.message, []))
    }
    const uuid = uuidv4();
    const newTask = {id: uuid, title, description, dueDate, status};
    store[req.user.userid].push(newTask);
    res.status(201).json(new ApiResponse(201, 'Task created successfully', newTask));
})
const updateTask = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {title,description,dueDate,status} = req.body;
    if(!req.user){
        const token =  await createNewUser()
        return res.status(300).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).json(new ApiResponse(400, 'Not Authorized', []))
    }
    if(!store[req.user.userid]){
        store[req.user.userid]=[]}
    const validate= updateTaskSchema({title,description,dueDate,status});
    if(!validate.success){
        return res.status(400).json(new ApiResponse(400, validate.error.message, []))
    }
    
    const task= store[req.user.userid].find(task=>task.id === id);
    if(!task){
        return res.status(404).json(new ApiResponse(404, 'Task not found', []))
    }
    task.title = title===undefined?task.title:title;
    task.description = description===undefined?task.description:description;
    task.dueDate = dueDate===undefined?task.dueDate:dueDate;
    task.status = status===undefined?task.status:status;
    res.status(200).json(new ApiResponse(200, 'Task updated successfully', task));
})
const deleteTask = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    if(!req.user){
        const token =  await createNewUser()
        return res.status(300).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).json(new ApiResponse(400, 'Not Authorized', []))
    }
    if(!store[req.user.userid]){
        store[req.user.userid]=[]}
    store[req.user.userid] = store[req.user.userid].filter(task=>task.id !== id);
    res.status(200).json(new ApiResponse(200, 'Task deleted successfully', []));
})
export { getTasks,getTaskById,createTask,updateTask ,deleteTask}