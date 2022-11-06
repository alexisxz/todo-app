import { Task } from "./Task"

export type TodoList = {
    id: string,
    name: string,
    tasks: Task[],
}