import { createContext } from "react";
import { State } from "./appReducer";

const noop = () => { }

type Props = {
    createList: (newListName: string) => void;
    removeList: (listId: string) => void;
    updateList: (listId: string, newListName: string) => void;

    addTask: (listId: string, newTaskName: string) => void;
    removeTask: (listId: string, taskId: string) => void;
    updateTask: (listId: string, taskId: string, newTaskName: string) => void;
    moveTask: (taskId: string, originListId: string, targetListId: string) => void;
}

export const AppContext = createContext<Props>({ createList: noop, removeList: noop, updateList: noop, addTask: noop, removeTask: noop, updateTask: noop, moveTask: noop });