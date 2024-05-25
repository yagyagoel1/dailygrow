import { z } from "zod";



export const Status = {
    pending: "pending",
    completed: "completed",
    inProgress: "in progress",

}

export const createTaskSchema = (data)=>{
  const schema = z.object({
        title: z.string().min(1),
        description: z.string().min(1).max(500),
        status: z.nativeEnum(Status),
        dueDate: z.date(),
    })
    return schema.safeParse(data);
}
export const updateTaskSchema = (data)=>{
    const schema = z.object({
        title: z.string().min(1).optional(),
        description: z.string().min(1).max(500).optional(),
        status: z.nativeEnum(Status).optional(),
        dueDate: z.date().optional(),
    })
    return schema.safeParse(data);
}