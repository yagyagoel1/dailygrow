import { store } from "./store";
import { createToken } from "./tokenHandler";
import { v4 as uuidv4 } from 'uuid';

export const createNewUser = ()=>{
    const id  = uuidv4();
    store[id] = [];
   const token =  createToken(id);
}