import * as Styled from './styles'
import { useContext, useState } from 'react'

// types
import { Task } from '../../types/Task'
import { TodoList } from '../../types/TodoList'

// utils
import { AppContext } from '../../utils/appContext'
import { State } from '../../utils/appReducer'


type Props = {
    task: Task,
    list: TodoList,
    lists: State,
}

export const TaskCard = ({ task, list, lists }: Props) => {

    const { updateTask, removeTask, moveTask } = useContext(AppContext)

    const [newTaskName, setNewTaskName] = useState<string>('')
    const [showInput, setShowInput] = useState<boolean>(false);
    const [targetListId, setTargetListId] = useState<string>('');

    // handlers
    const handlerSaveOnClick = (taskId: string) => {
        if (!newTaskName) return alert('Please type a new task name or click on cancel button')
        updateTask(list.id, taskId, newTaskName)
        setShowInput(!showInput);
        setNewTaskName('');
    }

    const handlerDeleteOnClick = (taskId: string) => {
        removeTask(list.id, taskId)
        setNewTaskName('');
    }

    const handlerCancelOnClick = () => {
        setShowInput(!showInput);
        setNewTaskName('');
    }

    const handlerMoveOnClick = (taskId: string) => {
        if (!targetListId) return;
        moveTask(taskId, list.id, targetListId)
    }

    return (
        <Styled.Container>
            {!showInput ? (
                <div>
                    <Styled.TaskArea>
                        <p>{task.name}</p>
                        <Styled.ButtonArea>
                            <button onClick={() => setShowInput(!showInput)}>Update</button>
                            <button onClick={() => handlerDeleteOnClick(task.id)}>Delete</button>
                        </Styled.ButtonArea>

                    </Styled.TaskArea>
                    <Styled.MoveArea>
                        <select onChange={e => setTargetListId(e.target.value)}>
                            {lists.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <button onClick={() => handlerMoveOnClick(task.id)}>Move</button>
                    </Styled.MoveArea>
                </div>
            ) : (
                <Styled.TaskArea>
                    <input type="text" placeholder='type the new task name' value={newTaskName} onChange={e => setNewTaskName(e.target.value)} />
                    <Styled.ButtonArea>
                        <button onClick={() => handlerSaveOnClick(task.id)}>Save</button>
                        <button onClick={handlerCancelOnClick}>Cancel</button>
                    </Styled.ButtonArea>
                </Styled.TaskArea>
            )}
        </Styled.Container>
    )
}