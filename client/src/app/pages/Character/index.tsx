import { Link, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { PrivateRoute } from 'app/routes/PrivateRoute'
import { MainContentBlock } from 'app/components'
import { Reset } from './Reset'
import { StatsAdder } from './StatsAdder'

export const Character = () => {
  return (
    <Wrapper>
      <MainContentBlock padding={0}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>
                level<span className='reset'>reset</span>
              </th>
              <th>strength</th>
              <th>agility</th>
              <th>vitality</th>
              <th>energy</th>
              <th>command</th>
              <th>free points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Dea7h</td>
              <td>
                400<span className='reset'>3</span>
              </td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>4,444</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Dea7h</td>
              <td>
                400<span className='reset'>3</span>
              </td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>4,444</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Dea7h</td>
              <td>
                400<span className='reset'>3</span>
              </td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>4,444</td>
            </tr>
          </tbody>
        </table>
      </MainContentBlock>

      <MainContentBlock padding={0}>
        <UserSubMenu>
          <SubLink to='/character/reset'>Reset Character</SubLink>
          <SubLink to='/character/stats'>Stats Adder</SubLink>
          <SubLink to='/character/clear'>Clear PK</SubLink>
          <SubLink to='/character/name'>Change Name</SubLink>
          <SubLink to='/character/class'>Change Class</SubLink>
        </UserSubMenu>
      </MainContentBlock>

      <Switch>
        <PrivateRoute path='/character/reset' component={Reset} />
        <PrivateRoute path='/character/stats' component={StatsAdder} />
        {/* <Route path='/character/clear' component={ClearPK} />
        <Route path='/character/name' component={ChangeName} />
        <Route path='/character/class' component={ChangeClass} /> */}
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
