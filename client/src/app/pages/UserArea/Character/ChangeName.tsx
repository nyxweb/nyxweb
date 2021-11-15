import { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import { Button, MainContentBlock, InfoBlob } from 'app/components'
import { useAppDispatch, useAppSelector } from 'store'
import { characterChangeName } from 'store/user'

export const ChangeName = () => {
  const [character, setCharacter] = useState<string>()
  const [newName, setNewName] = useState<string>('')

  const { user, characters } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleNameChange = async () => {
    if (!character) return toast.error('Please select a character.')
    if (newName.length < 4) return toast.error('New name cannot be less than 4 characters.')
    if (character === newName) return toast.error(`Your name is already ${character}.`)
    if (!user?.resources.gold || user.resources.gold < 500) return toast.error(`You need 500 gold to change your name.`)

    dispatch(characterChangeName({ character, newName }))
  }

  return (
    <MainContentBlock>
      <Wrapper>
        <select onChange={(e) => setCharacter(e.target.value === '-' ? undefined : e.target.value)}>
          <option value='-'>-</option>
          {characters.data
            ? characters.data.map((char) => (
                <option key={char.Name} value={char.Name}>
                  {char.Name}
                </option>
              ))
            : null}
        </select>
        <input placeholder='New name' type='text' value={newName} onChange={(e) => setNewName(e.target.value)} maxLength={10} />
        <Button value='Change Name' onClick={handleNameChange} />
      </Wrapper>
      <InfoBlob>
        <div>
          Change name costs <span className='gold'>500 gold</span>.
        </div>
        {user?.resources.gold && user.resources.gold >= 500 ? (
          <div>
            New balance after name change: <span className='gold'>{(user?.resources.gold || 0) - 500} gold</span>
          </div>
        ) : (
          <div>
            You need <span className='gold'>{500 - user!.resources.gold} gold</span>. Time to{' '}
            <button onClick={() => history.push('/account/get-gold')}>get more gold</button>?
          </div>
        )}
      </InfoBlob>
    </MainContentBlock>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  input {
    margin: 0 10px;
  }
`
