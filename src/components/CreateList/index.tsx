import { useContext, useState } from 'react'
import * as Styled from './styles'

// utils
import { AppContext } from '../../utils/appContext'
import { State } from '../../utils/appReducer'

export const CreateList = () => {
    const { createList } = useContext(AppContext)
    const [newListName, setnewListName] = useState<string>('')

    // handlers
    const handlerCreateOnClick = () => {
        if (!newListName) return alert('field can not be blank');
        createList(newListName);
        setnewListName('');
    }

    return (
        <Styled.Container>
            <input type="text" placeholder='Create a new list' value={newListName} onChange={e => setnewListName(e.target.value)} />
            <button onClick={handlerCreateOnClick}>Create new List</button>
        </Styled.Container>
    )
}