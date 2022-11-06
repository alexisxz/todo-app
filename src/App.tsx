import { useMemo, useReducer } from "react"
import { v4 as uuid } from 'uuid'

// style
import * as Styled from './App.styles'

// components
import { CreateList } from "./components/CreateList"
import { TodoListCard } from "./components/TodoListCard"

// utils
import { appReducer } from './utils/appReducer'
import { AppContext } from './utils/appContext'

// types
import { TodoList } from './types/TodoList'

export const initalState: TodoList[] = [
  { id: uuid(), name: 'my first todo', tasks: [{ id: uuid(), name: 'thank you for your support' }, { id: uuid(), name: 'I will pay you a dinner' }] }
]

// COMPONENT
export const App = () => {

  const [state, dispatch] = useReducer(appReducer, initalState)

  const contextValue = useMemo(() => {

    const createList = (newListName: string) => {
      dispatch({ type: "CREATE_LIST", payload: { newListName } })
    }

    const removeList = (listId: string) => {
      dispatch({ type: "REMOVE_LIST", payload: { listId } })
    }

    const updateList = (listId: string, newListName: string) => {
      dispatch({ type: "UPDATE_LIST", payload: { listId, newListName } })
    }

    const addTask = (listId: string, newTaskName: string) => {
      dispatch({ type: "ADD_TASK", payload: { listId, newTaskName } })
    }

    const removeTask = (listId: string, taskId: string) => {
      dispatch({ type: "REMOVE_TASK", payload: { listId, taskId } })
    }

    const updateTask = (listId: string, taskId: string, newTaskName: string) => {
      dispatch({ type: "UPDATE_TASK", payload: { listId, taskId, newTaskName } })
    }

    const moveTask = (taskId: string, originListId: string, targetListId: string) => {
      dispatch({ type: "MOVE_TASK", payload: { taskId, originListId, targetListId } })
    }

    return {
      createList: createList,
      removeList: removeList,
      updateList: updateList,

      addTask: addTask,
      removeTask: removeTask,
      updateTask: updateTask,
      moveTask: moveTask,
    }
  }, [])

  return (
    <AppContext.Provider value={contextValue}>
      <Styled.Container>
        <Styled.Area>
          <h1>Improved todo</h1>
          <Styled.Header>
            <CreateList />
          </Styled.Header>

          <Styled.Board>
            {state.map((list, index) => (
              <TodoListCard key={index} list={list} lists={state} />
            ))}
          </Styled.Board>
        </Styled.Area>
      </Styled.Container>
    </AppContext.Provider>
  )
}