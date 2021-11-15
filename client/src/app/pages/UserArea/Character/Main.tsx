import { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { Button, MainContentBlock, InfoBlob } from 'app/components'
import { useAppDispatch, useAppSelector } from 'store'
import { characterSetMain } from 'store/user'

export const MainCharacter = () => {
  const [character, setCharacter] = useState<string>()
  const { user, characters } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const handleSetMain = async () => {
    if (!character) return toast.error('Please select a character.')
    if (user?.main_character === character) return toast.error('This is already your main character.')

    dispatch(characterSetMain({ character }))
  }

  return (
    <MainContentBlock>
      <Wrapper>
        <select onChange={(e) => setCharacter(e.target.value === '-' ? undefined : e.target.value)}>
          <option value='-'>-</option>
          {characters.data
            ? characters.data
                .filter((char) => char.cLevel >= 50)
                .map((char) => (
                  <option key={char.Name} value={char.Name}>
                    {char.Name} [level: {char.cLevel}]
                  </option>
                ))
            : null}
        </select>
        <Button value='Set Main' onClick={handleSetMain} />
      </Wrapper>
      <InfoBlob>
        <div style={{ paddingBottom: 10 }}>
          Current main: <b>{user?.main_character || 'n/a'}</b>
        </div>
        <div>Your main character must be level 50 or above.</div>
        <div>
          The main character you set here will be used as a default name everywhere, e.g. Chat, Market, Auction etc...
        </div>
      </InfoBlob>
    </MainContentBlock>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  select {
    margin-right: 10px;
  }
`
