import { addTodo, getAllTodos, updateTodo, deleteTodo } from "../controller/Controller"

export const AppRoutes = [
    {
        path: "/todo",
        method: "get",
        action: getAllTodos,
        validationInputs: [],
        validationKey: "query"
    },
    {
        path: "/todo",
        method: "post",
        action: addTodo,
        validationInputs: ["title", "description"],
        validationKey: "body"
    },
    {
        path: "/todo/:id",
        method: "delete",
        action: deleteTodo,
        validationInputs: ["id"],
        validationKey: "params"
    },
    {
        path: "/todo",
        method: "put",
        action: updateTodo,
        validationInputs: ["id", "title", "description"],
        validationKey: "body"
    }
];
