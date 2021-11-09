import { useEffect, useState, Fragment } from 'react'
import { GuildMark, Character, MainContentBlock, ReactLoader } from 'app/components'
import { useAppDispatch, useAppSelector } from 'store'
import { HOF } from './HOF'
import { getCharacters, ICharacter } from 'store/ranking'
import styled from 'styled-components'
import { getClassInfo } from 'utils'

interface Filters {
  classes: number[]
  search: string
}

export const Rankings = () => {
  const dispatch = useAppDispatch()
  const { data, loading } = useAppSelector((state) => state.ranking.characters)
  const [filters, setFilters] = useState<Filters>({
    classes: [],
    search: '',
  })

  useEffect(() => {
    dispatch(getCharacters())
  }, [dispatch])

  const filterResults = (chars: ICharacter[]) => {
    return chars
      .slice(0, 25)
      .filter(
        (char) =>
          (filters.classes.length ? filters.classes.includes(char.Class) : true) &&
          (filters.search.length ? new RegExp(filters.search, 'i').test(char.Name) : true),
      )
  }

  const handleClassToggle = (Class: number) => {
    setFilters((state) => ({
      ...state,
      classes: state.classes.includes(Class) ? state.classes.filter((c) => c !== Class) : [...state.classes, Class],
    }))
  }

  const handleSearch = (name: string) => {
    setFilters((state) => ({
      ...state,
      search: name,
    }))
  }

  return (
    <div>
      <HOF />
      <MainContentBlock padding={5}>
        <FilterRow style={{ padding: 5 }}>
          <input placeholder='Search character' onChange={(e) => handleSearch(e.target.value)} />
        </FilterRow>
        <FilterRow>
          <FilterWrapper>
            <input type='checkbox' onChange={() => handleClassToggle(0)} />
            <img src='/images/classes/dw.jpg' alt='dw' />
          </FilterWrapper>
          <FilterWrapper>
            <input type='checkbox' onChange={() => handleClassToggle(16)} />
            <img src='/images/classes/dk.jpg' alt='dk' />
          </FilterWrapper>
          <FilterWrapper>
            <input type='checkbox' onChange={() => handleClassToggle(32)} />
            <img src='/images/classes/fe.jpg' alt='fe' />
          </FilterWrapper>
          <FilterWrapper>
            <input type='checkbox' onChange={() => handleClassToggle(48)} />
            <img src='/images/classes/mg.jpg' alt='mg' />
          </FilterWrapper>
        </FilterRow>
        <FilterRow>
          <FilterWrapper>
            <input type='checkbox' onChange={() => handleClassToggle(1)} />
            <img src='/images/classes/sm.jpg' alt='sm' />
          </FilterWrapper>
          <FilterWrapper>
            <input type='checkbox' onChange={() => handleClassToggle(17)} />
            <img src='/images/classes/bk.jpg' alt='bk' />
          </FilterWrapper>
          <FilterWrapper>
            <input type='checkbox' onChange={() => handleClassToggle(33)} />
            <img src='/images/classes/me.jpg' alt='me' />
          </FilterWrapper>
          <FilterWrapper>
            <input type='checkbox' onChange={() => handleClassToggle(64)} />
            <img src='/images/classes/dl.jpg' alt='dl' />
          </FilterWrapper>
        </FilterRow>
      </MainContentBlock>
      <MainContentBlock>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: 'left' }}>name</th>
              <th>level</th>
              <th>quest</th>
              <th>sky</th>
              <th>pk</th>
              <th style={{ textAlign: 'right' }}>guild</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center' }}>
                  <ReactLoader />
                </td>
              </tr>
            ) : !data?.length ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center' }}>
                  No characters found...
                </td>
              </tr>
            ) : (
              <Fragment>
                <tr>
                  <td colSpan={7} style={{ padding: 0 }}>
                    <Spacer />
                  </td>
                </tr>
                {filterResults(data).map((char, index) => {
                  const classInfo = getClassInfo(char.Class)

                  return (
                    <Fragment key={char.Name + index}>
                      <tr style={{ background: index % 2 ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}>
                        <td
                          style={{
                            background: `url('/images/classes/${classInfo.classImage.short}') no-repeat center center/cover`,
                            width: 50,
                            height: 50,
                            position: 'relative',
                          }}
                          rowSpan={2}
                        >
                          <Rank>{index + 1}</Rank>
                          <Status online={char.memb_stat?.ConnectStat === 1} />
                        </td>
                        <td style={{ textAlign: 'left' }}>
                          <Character char={char} guild />
                        </td>
                        <td>{char.cLevel}</td>
                        <td>{char.QuestNumber}</td>
                        <td>{char.SkyEventWins}</td>
                        <td>{char.PkCount}</td>
                        <td rowSpan={2} style={{ width: 50, padding: 0 }}>
                          {char.member ? (
                            <GuildMark markHex={char.member?.guild.G_Mark} size={50} style={{ float: 'right' }} />
                          ) : null}
                        </td>
                      </tr>
                      <tr style={{ background: index % 2 ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}>
                        <td style={{ textAlign: 'left' }}>{classInfo.className.long}</td>
                        <td colSpan={4} style={{ textAlign: 'left' }}>
                          <i>"I am always first, unless I am not."</i>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={7} style={{ padding: 0 }}>
                          <Spacer />
                        </td>
                      </tr>
                    </Fragment>
                  )
                })}
              </Fragment>
            )}
          </tbody>
        </Table>
      </MainContentBlock>
    </div>
  )
}

const Table = styled.table`
  td {
    padding: 0 8px;
    border: none;
  }

  tr:hover {
    background: none;
  }
`

const Rank = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 5px;
  border-top-left-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
`

const Status = styled.div<{ online: boolean }>`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ online }) => (online ? '#00ff2a' : '#ac1010')};
`

const Spacer = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(63, 85, 114, 0.4);
  margin: 10px auto;
`

const FilterWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  cursor: url('/images/main/pointer.cur'), pointer;

  input {
    margin-right: 8px;
  }
`

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`
