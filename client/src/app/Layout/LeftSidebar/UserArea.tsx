import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from 'app/components'
import { useAppSelector } from 'store'

export const UserArea = () => {
  const user = useAppSelector((state) => state.user.user)

  const getActiveClassName = (path: string) => {
    if (window.location.pathname.startsWith(`/${path}`)) return 'active'
  }

  return (
    <Wrapper>
      <Title>
        <AccountName status={false}>{user?.username}</AccountName>
        <Button value='Logout' looks='green' />
      </Title>
      <Resources>
        <Row>
          <Resource />
          <Resource />
          <Resource />
          <Resource />
          <Resource />
          <Resource />
          <Resource />
        </Row>
        <Row>
          <Resource />
          <Resource />
          <Resource />
          <Resource />
          <Resource />
          <Resource />
          <Resource />
        </Row>
        <Row>
          <Resource width={135}>
            {`Zen`}
            <ResourceValue color='green'>{(23423424343).toLocaleString()}</ResourceValue>
          </Resource>
          <Resource width={100}>
            {`Credits`}
            <ResourceValue color='orange'>{(43332).toLocaleString()}</ResourceValue>
          </Resource>
        </Row>
      </Resources>
      <Spacer />
      <UserMenu>
        <Link to='/account'>
          <MenuCategory className={getActiveClassName('account')}>Account Settings</MenuCategory>
        </Link>
        <Link to='/character'>
          <MenuCategory className={getActiveClassName('character')}>Character Management</MenuCategory>
        </Link>
        <Link to='/extra'>
          <MenuCategory className={getActiveClassName('extra')}>Extra Features</MenuCategory>
        </Link>
        <Link to='/admin'>
          <MenuCategory className={getActiveClassName('admin')}>Administration</MenuCategory>
        </Link>
      </UserMenu>
    </Wrapper>
  )
}

const Spacer = styled.div`
  width: 80%;
  height: 1px;
  background-color: rgba(63, 85, 114, 0.4);
  margin: 0 auto;
`

const Wrapper = styled.div`
  background: url('/images/partials/login-block-bg.jpg') bottom no-repeat;
  padding: 15px;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AccountName = styled.div<{ status: boolean }>`
  position: relative;
  padding-right: 15px;
  font-size: 18px;
  color: #ff9900;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ status }) => (status ? 'green' : 'red')};
  }
`

const Resources = styled.div`
  margin: 15px auto;
  width: 240px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`

const Resource = styled.div<{ width?: number; color?: string }>`
  width: ${({ width }) => `${width || 30}px`};
  height: 30px;
  box-shadow: 0px 0 15px 0 rgba(0, 0, 0, 0.2);
  background: rgba(63, 85, 114, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ResourceValue = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  margin-left: 5px;
`

const UserMenu = styled.div`
  margin: 15px 0 0 0;
`

const MenuCategory = styled.div`
  position: relative;
  background: rgba(63, 85, 114, 0.1);
  padding: 10px;
  margin: 5px 0 0 0;
  cursor: url('/images/main/pointer.cur'), pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  transition: 0.2s;
  color: #899cb8;

  &:after {
    content: '';
    position: absolute;
    right: 10px;
    width: 8px;
    height: 12px;
    background: url('/images/icons/menu-arrow.png') no-repeat;
    opacity: 0.5;
  }

  &:hover&:after,
  &.active&:after {
    opacity: 1;
  }

  &:hover,
  &.active {
    color: #b6c6dd;
  }
`
