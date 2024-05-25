import { store } from "./store.js";
import { createToken } from "./tokenHandler.js";
import { v4 as uuidv4 } from 'uuid';

export const createNewUser = ()=>{
    const id  = uuidv4();
    store[id] = [];
   const token =  createToken(id);
   return token 
}