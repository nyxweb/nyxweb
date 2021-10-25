import styled from 'styled-components'
import { useAppSelector } from 'store'

import { Login } from './Login'
import { UserArea } from './UserArea'
import { TopGuilds } from './TopGuilds'

export const LeftSidebar = () => {
  const authorized = useAppSelector((state) => state.user.authorized === true)

  return (
    <Wrapper>
      {authorized ? <UserArea /> : <Login />}
      <TopGuilds />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 285px;
  background: url('/images/layout/sidebar-bg.jpg');
  margin: 50px 0 110px 0;
  position: relative;

  &:after {
    content: '';
    background: url('/images/layout/left-sidebar-icon.png') no-repeat;
    left: -4px;
    bottom: -4px;
    width: 25px;
    height: 25px;
    position: absolute;
  }
`
