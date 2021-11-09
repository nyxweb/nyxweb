import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { getClassInfo } from 'utils'
import { MainContentBlock, Modal, ReactLoader } from 'app/components'
import { IHOFCharacter, getHOF } from 'store/ranking'
import { useAppDispatch, useAppSelector } from 'store'
import { ModalCharacter } from 'app/components'

interface Props {
  char: IHOFCharacter
  onClick: () => void
}

const CharacterCard: React.FC<Props> = ({ char, onClick }) => {
  const classInfo = getClassInfo(char.class)

  return (
    <CharacterCardWrapper onClick={onClick}>
      <DetailsWrapper bg={classInfo.classImage.long}>
        <Detail>{char.name}</Detail>
        <Detail>{char.date.substr(0, 10)}</Detail>
      </DetailsWrapper>
      <img src={`/images/ranks/${char.rank}.png`} alt={`rank ${char.rank}`} className='RankIcon' />
    </CharacterCardWrapper>
  )
}

export const HOF = () => {
  const dispatch = useAppDispatch()
  const hof = useAppSelector((state) => state.ranking.hof)
  const [modal, setModal] = useState<{ active: boolean; name?: string }>({ active: false })

  useEffect(() => {
    dispatch(getHOF())
  }, [dispatch])

  const handleClick = (char: IHOFCharacter) => {
    setModal({ active: true, name: char.name })
  }

  if (!hof.loading && !hof.characters) return null

  return (
    <MainContentBlock padding={0}>
      <CharacterSelectWrapper>
        {hof.loading ? (
          <ReactLoader />
        ) : (
          hof.characters?.map((char, key) => <CharacterCard key={key} char={char} onClick={() => handleClick(char)} />)
        )}
      </CharacterSelectWrapper>
      <Modal active={modal.active} closeModal={() => setModal({ active: false })}>
        <ModalCharacter name={modal.name} />
      </Modal>
    </MainContentBlock>
  )
}

const CharacterSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`

const CharacterCardWrapper = styled.div`
  position: relative;
  width: calc(565px / 5);
  height: 200px;
  margin-right: 10px;
  transition: 400ms;

  &:hover {
    transform: translate(2px, 2px);
  }

  &:last-of-type {
    margin: 0;
  }

  .RankIcon {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
  }
`

const DetailsWrapper = styled.div<{ bg: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: url('/images/classes/${({ bg }) => bg}') no-repeat center center / 100% 100%;

  cursor: url('/images/main/pointer.cur'), pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  overflow: hidden;
  color: #cccccc;

  &:after {
    content: '';
    position: absolute;
    top: -110%;
    left: -210%;
    width: 200%;
    height: 200%;
    opacity: 0;
    transform: rotate(30deg);
    background: rgba(255, 255, 255, 0.13);
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.2) 0,
      rgba(255, 255, 255, 0.13) 77%,
      rgba(255, 255, 255, 0.5) 92%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &:hover {
    color: #ffffff;
  }

  &:hover&:after {
    opacity: 1;
    top: -40%;
    left: 100%;
    transition-property: left, top, opacity;
    transition-duration: 0.4s, 0.4s, 0.15s;
    transition-timing-function: ease;
  }
`

const Detail = styled.div`
  width: calc(100% - 2px);
  padding: 5px;
  margin: 1px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: url('/images/main/pointer.cur'), pointer;
`
