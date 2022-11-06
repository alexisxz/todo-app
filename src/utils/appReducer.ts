import { v4 as uuid } from "uuid";

// types
import { Task } from "../types/Task";
import { TodoList } from "../types/TodoList";

export type Action = {
    type: "CREATE_LIST",
    payload: { newListName: string }
} | {
    type: "REMOVE_LIST",
    payload: { listId: string }
} | {
    type: "UPDATE_LIST",
    payload: { listId: string, newListName: string }
} | {
    type: "ADD_TASK",
    payload: { listId: string, newTaskName: string }
} | {
    type: "REMOVE_TASK",
    payload: { listId: string, taskId: string }
} | {
    type: "UPDATE_TASK",
    payload: { listId: string, taskId: string, newTaskName: string }
} | {
    type: "MOVE_TASK",
    payload: { taskId: string, originListId: string, targetListId: string }
}

// global state
export type State = TodoList[]

export const appReducer = (state: State, action: Action): State => {

    switch (action.type) {
        case "CREATE_LIST": {
            const newListName = action.payload.newListName;
            if (!newListName) return state;
            if (state.find(list => list.name === newListName)) return state;


            const newList: TodoList = {
                id: uuid(),
                name: newListName,
                tasks: [],
            }

            const newState = [...state, newList]
            return newState
        }

        case "REMOVE_LIST": {
            const listId = action.payload.listId;
            if (!listId) return state;

            const newState = state.filter(list => list.id !== listId);

            return newState
        }

        case "UPDATE_LIST": {
            const listId = action.payload.listId;
            if (!listId) return state;
            const newListName = action.payload.newListName;
            if (!newListName) return state;

            const newState = state.map(list => {
                if (list.id === listId) {
                    return { ...list, name: newListName }
                }
                return list
            })

            return newState
        }

        case "ADD_TASK": {
            const listId = action.payload.listId;
            if (!listId) return state;

            const newTaskName = action.payload.newTaskName;
            if (!newTaskName) return state;

            const newTask: Task = {
                id: uuid(),
                name: newTaskName,
            }

            const newState = state.map(list => {
                if (list.id === listId) {
                    return { ...list, tasks: [...list.tasks, newTask] }
                }
                return list;
            })

            return newState;
        }

        case "REMOVE_TASK": {
            const listId = action.payload.listId;
            if (!listId) return state;

            const taskId = action.payload.taskId;
            if (!taskId) return state;

            const newState = state.map(list => {
                if (list.id === listId) {
                    const newTasks = list.tasks.filter(task => task.id !== taskId);
                    return { ...list, tasks: newTasks };
                }
                return list;
            })
            return newState;
        }

        case "UPDATE_TASK": {
            const listId = action.payload.listId;
            if (!listId) return state;

            const taskId = action.payload.taskId;
            if (!taskId) return state;

            const newTaskName = action.payload.newTaskName;
            if (!newTaskName) return state;

            const newState = state.map(list => {
                if (list.id === listId) {
                    const newCards = list.tasks.map(task => {
                        if (task.id === taskId) {
                            return { ...task, name: newTaskName }
                        }
                        return task;
                    })
                    return { ...list, tasks: newCards }
                }
                return list
            })
            return newState;
        }

        case "MOVE_TASK": {
            const taskId = action.payload.taskId;
            if (!taskId) return state;

            const originListId = action.payload.originListId;
            if (!originListId) return state;

            const targetListId = action.payload.targetListId;
            if (!targetListId) return state;

            if (originListId === targetListId) return state;

            const taskInfos = state.find(list => list.id === originListId)?.tasks.find(task => task.id === taskId)
            if (!taskInfos) return state;

            const newState = state.map(list => {
                if (list.id === originListId) {
                    return { ...list, tasks: [...list.tasks.filter(task => task.id !== taskId)] }
                }
                if (list.id === targetListId) {
                    return { ...list, tasks: [...list.tasks, taskInfos] }
                }
                return list;
            })
            return newState
        }

        default: return state
    }
}