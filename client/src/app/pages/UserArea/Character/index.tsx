import { Link, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { PrivateRoute } from 'app/routes/PrivateRoute'
import { MainContentBlock, ReactLoader } from 'app/components'
import { useRequest } from 'hooks'

import { StatsAdder } from './StatsAdder'
import { ClearPK } from './ClearPK'
import { ChangeName } from './ChangeName'
import { ChangeClass } from './ChangeClass'
import { ICharacterClass } from 'store/ranking'
import { getClassInfo } from 'utils'

export interface ICharacterPrivate {
  Dexterity: number
  Energy: number
  Leadership: number
  LevelUpPoint: number
  Name: string
  Class: ICharacterClass
  Strength: number
  Vitality: number
  account_character: { GameIDC: string }
  cLevel: number
  is_online: boolean
}

export const Character = () => {
  const [characters, loading] = useRequest<ICharacterPrivate[]>('/users/characters')

  return (
    <Wrapper>
      <MainContentBlock padding={0}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>class</th>
              <th>level</th>
              <th>strength</th>
              <th>agility</th>
              <th>vitality</th>
              <th>energy</th>
              <th>command</th>
              <th>free points</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9}>
                  <ReactLoader />
                </td>
              </tr>
            ) : !characters?.length ? (
              <tr>
                <td>No characters found.</td>
              </tr>
            ) : (
              characters.map((char, index) => {
                const classInfo = getClassInfo(char.Class)

                return (
                  <tr key={char.Name}>
                    <td>{index + 1}</td>
                    <td style={{ textAlign: 'left' }}>
                      <Status isOnline={char.is_online}>{char.Name}</Status>
                    </td>
                    <td>{classInfo.className.short}</td>
                    <td>{char.cLevel}</td>
                    <td>{char.Strength.toLocaleString()}</td>
                    <td>{char.Dexterity.toLocaleString()}</td>
                    <td>{char.Vitality.toLocaleString()}</td>
                    <td>{char.Energy.toLocaleString()}</td>
                    <td>{char.Class === 64 ? char.Leadership.toLocaleString() : '-'}</td>
                    <td>{char.LevelUpPoint.toLocaleString()}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </MainContentBlock>

      <MainContentBlock padding={0}>
        <UserSubMenu>
          <SubLink to='/character/stats'>Stats Adder</SubLink>
          <SubLink to='/character/clear'>Clear PK</SubLink>
          <SubLink to='/character/name'>Change Name</SubLink>
          <SubLink to='/character/class'>Change Class</SubLink>
        </UserSubMenu>
      </MainContentBlock>

      <Switch>
        <PrivateRoute path='/character/stats' component={StatsAdder} />
        <PrivateRoute path='/character/clear' component={ClearPK} />
        <PrivateRoute path='/character/name' component={ChangeName} />
        <PrivateRoute path='/character/class' component={ChangeClass} />
      </Switch>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .reset {
    color: red;
    margin-left: 3px;
  }
`

const UserSubMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px 0;
`

const SubLink = styled(Link)`
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.1);
`

const Status = styled.div<{ isOnline: boolean }>`
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: -7px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${({ isOnline }) => (isOnline ? 'green' : 'red')};
  }
`
