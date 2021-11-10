import { Link, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { PrivateRoute } from 'app/routes/PrivateRoute'
import { MainContentBlock } from 'app/components'

import { Logs } from './Logs'
import { ChangePassword } from './ChangePassword'

export const Account = () => {
  return (
    <Wrapper>
      <MainContentBlock padding={0}>
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td>Dea7h</td>
              <td>400</td>
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
          <SubLink to='/account/password'>Change Password</SubLink>
          <SubLink to='/account/logs'>Account Logs</SubLink>
        </UserSubMenu>
      </MainContentBlock>

      <Switch>
        <PrivateRoute path='/account/password' component={ChangePassword} />
        <PrivateRoute path='/account' component={Logs} />
      </Switch>
    </Wrapper>
  )
}

const Wrapper = styled.div``

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
