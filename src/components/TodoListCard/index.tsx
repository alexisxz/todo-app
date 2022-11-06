import { useContext, useState } from 'react'
import * as Styled from './styles'

// types
import { TodoList } from '../../types/TodoList'

// components
import { TaskCard } from '../TaskCard'

// utils
import { AppContext } from '../../utils/appContext'
import { State } from '../../utils/appReducer'

type Props = {
    list: TodoList,
    lists: State
}

export const TodoListCard = ({ list, lists }: Props) => {

    const { removeList, updateList } = useContext(AppContext)

    const [newListName, setNewListName] = useState<string>('')
    const [showInput, setShowInput] = useState<boolean>(false);

    // handlers
    const handlerRemoveOnClick = (listId: string) => {
        removeList(listId)
    }

    const handlerUpdateOnClick = (listId: string) => {
        if (!newListName) return alert('Please fill up the new list name or click on cancel button');

        updateList(listId, newListName)

        setShowInput(!showInput);
        setNewListName('');
    }

    const handlerCancelOnClick = () => {
        setShowInput(!showInput);
        setNewListName('');
    }

    return (
        <Styled.Container>
            <Styled.Heading>
                <h2>{list.name}</h2>
            </Styled.Heading>
            {!showInput ? (
                <Styled.ButtonsWrapper>
                    <button onClick={() => setShowInput(!showInput)}>Update</button>
                    <button onClick={() => handlerRemoveOnClick(list.id)}>Delete</button>
                </Styled.ButtonsWrapper>
            ) : (
                <Styled.ButtonsWrapper>
                    <input type="text" value={newListName} onChange={e => setNewListName(e.target.value)} />
                    <button onClick={() => handlerUpdateOnClick(list.id)}>Save</button>
                    <button onClick={handlerCancelOnClick}>Cancel</button>
                </Styled.ButtonsWrapper>
            )}

            <Styled.TasksWrapper>
                {list.tasks.map((task, index) => (
                    <TaskCard key={index} task={task} list={list} lists={lists} />
                ))}
            </Styled.TasksWrapper>

        </Styled.Container>
    )
}