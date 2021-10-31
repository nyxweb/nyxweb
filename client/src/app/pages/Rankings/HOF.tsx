import { useEffect } from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

import { getClassInfo } from 'utils'
import { MainContentBlock } from 'app/components'
import { HOFCharacter, getHOF } from 'store/ranking'
import { useAppDispatch, useAppSelector } from 'store'

interface Props {
  char: HOFCharacter
}

const CharacterCard: React.FC<Props> = ({ char }) => {
  const classInfo = getClassInfo(char.class)

  return (
    <CharacterCardWrapper>
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

  useEffect(() => {
    dispatch(getHOF())
  }, [dispatch])

  if (!hof.loading && !hof.characters) return null

  return (
    <MainContentBlock padding={0}>
      <CharacterSelectWrapper>
        {hof.loading ? (
          <Loader type='Triangle' height={40} color='lightblue' />
        ) : (
          hof.characters?.map((char, key) => <CharacterCard key={key} char={char} />)
        )}
      </CharacterSelectWrapper>
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
    transition-duration: 0.7s, 0.7s, 0.15s;
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
