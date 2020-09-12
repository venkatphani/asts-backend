import { Request, Response } from 'express';
import { getManager } from "typeorm"
import ToDo from "../entity/ToDo";


export async function addTodo(req: Request, res: Response) {
    try {
        const toDoRepository = getManager().getRepository(ToDo);
        const newToDo = toDoRepository.create(req.body);
        await toDoRepository.save(newToDo);
        res.json({ message: "Successfully Created.", data: newToDo, success: true })
    }
    catch (error) {
        console.error("Error ", error);
        res.status(500).json({ message: error.message, success: false });
    }

}

export async function getAllTodos(req: Request, res: Response) {
    try {
        const toDoRepository = getManager().getRepository(ToDo);
        const toDos: ToDo[] = await toDoRepository.find();
        res.json({ data: toDos, success: true })
    }
    catch (error) {
        console.error("Error ", error);
        res.status(500).json({ message: error.message, success: false });
    }

}


export async function updateTodo(req: Request, res: Response) {
    try {
        const { id, title, description, dueDate } = req.body;
        const toDoRepository = getManager().getRepository(ToDo);
        const toDo = await toDoRepository.findOne(id);
        if (!toDo) {
            res.status(404).json({ message: "To Do Not Found", success: false });
        }
        toDo.title = title;
        toDo.description = description;
        toDo.dueDate = dueDate;
        const updatedToDo = await toDoRepository.save(toDo);
        res.json({ message: "Successfully Updated", data: updatedToDo, success: true });
    }
    catch (error) {
        console.error("Error ", error);
        res.status(500).json({ message: error.message, success: false });
    }

}

export async function deleteTodo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const toDoRepository = getManager().getRepository(ToDo);
        const toDo = await toDoRepository.findOne(id)
        if (!toDo) {
            res.status(404).json({ message: "To Do Not Found", success: false });
        }
        await toDoRepository.delete(toDo);
        res.json({ message: "Successfully Deleted", data: toDo, success: true });
    }
    catch (error) {
        console.error("Error ", error);
        res.status(500).json({ message: error.message, success: false });
    }

}

