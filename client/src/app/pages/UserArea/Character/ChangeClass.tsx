import { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import { Button, MainContentBlock, InfoBlob } from 'app/components'
import { useAppDispatch, useAppSelector } from 'store'
import { characterChangeClass } from 'store/user'
import { getClassInfo } from 'utils'
import { ICharacterClass } from 'typings'

export const ChangeClass = () => {
  const [character, setCharacter] = useState<string>()
  const [newClass, setClass] = useState<ICharacterClass>()

  const { user, characters } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleClassChange = async () => {
    if (!character) return toast.error('Please select a character.')
    if (typeof newClass === 'undefined') return toast.error('Please choose a new class.')
    if (characters.data!.find((char) => char.Name === character)?.Class === newClass)
      return toast.error(`Your character is already this class.`)
    if (!user?.resources.gold || user.resources.gold < 500)
      return toast.error(`You need 500 gold to change your class.`)

    dispatch(characterChangeClass({ character, newClass }))
  }

  return (
    <MainContentBlock>
      <Wrapper>
        <select onChange={(e) => setCharacter(e.target.value === '-' ? undefined : e.target.value)}>
          <option value='-'>-</option>
          {characters.data
            ? characters.data.map((char) => {
                const classInfo = getClassInfo(char.Class)

                return (
                  <option key={char.Name} value={char.Name}>
                    {char.Name} ({classInfo.className.long})
                  </option>
                )
              })
            : null}
        </select>

        <select
          onChange={(e) => setClass(e.target.value === '-' ? undefined : (Number(e.target.value) as ICharacterClass))}
          className='middleSelect'
        >
          <option value='-'>-</option>
          <option value={1}>Soul Master</option>
          <option value={17}>Blade Knight</option>
          <option value={33}>Muse Elf</option>
          <option value={48}>Magic Gladiator</option>
          <option value={64}>Dark Lord</option>
        </select>

        <Button value='Change Class' onClick={handleClassChange} />
      </Wrapper>
      <InfoBlob>
        <div>
          Change class costs <span className='gold'>500 gold</span>.
        </div>
        {user?.resources.gold && user.resources.gold >= 500 ? (
          <div>
            New balance after class change: <span className='gold'>{(user?.resources.gold || 0) - 500} gold</span>
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

  .middleSelect {
    margin: 0 10px;
  }
`
