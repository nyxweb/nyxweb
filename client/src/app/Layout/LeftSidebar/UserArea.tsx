import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from 'app/components'
import { useAppDispatch, useAppSelector } from 'store'
import { userLogout } from 'store/user'

interface IResource {
  group: number
  id: number
  level?: number
}

const RESOURCES: Record<string, IResource> = {
  chaos: {
    group: 12,
    id: 15,
  },
  bless: {
    group: 14,
    id: 13,
  },
  soul: {
    group: 14,
    id: 14,
  },
  life: {
    group: 14,
    id: 16,
  },
  creation: {
    group: 14,
    id: 22,
  },
  rena: {
    group: 14,
    id: 21,
    level: 0,
  },
  stone: {
    group: 14,
    id: 21,
    level: 1,
  },
  boh: {
    group: 14,
    id: 11,
    level: 1,
  },
  box1: {
    group: 14,
    id: 11,
    level: 7,
  },
  box2: {
    group: 14,
    id: 11,
    level: 8,
  },
  box3: {
    group: 14,
    id: 11,
    level: 9,
  },
  box4: {
    group: 14,
    id: 11,
    level: 10,
  },
  box5: {
    group: 14,
    id: 11,
    level: 11,
  },
  heart: {
    group: 14,
    id: 12,
  },
}

interface Props {
  count: number
  width?: number
  height?: number
  color?: string
  label?: string
  res?: keyof typeof RESOURCES
}

const Resource: React.FC<Props> = ({ count, width = 30, height = 30, color, label, res }) => {
  const resource = RESOURCES[res!]
  const itemImage = resource
    ? `${resource.group}/${resource.id}${resource.level ? `-${resource.level}` : ''}.gif`
    : undefined

  return (
    <ResourceWrapper width={width} height={height} image={itemImage}>
      {label ? (
        <>
          {label}
          <ResourceValue color={color}>{count.toLocaleString()}</ResourceValue>
        </>
      ) : (
        count
      )}
    </ResourceWrapper>
  )
}

export const UserArea = () => {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()

  if (!user) return null

  const getActiveClassName = (path: string) => {
    if (window.location.pathname.startsWith(`/${path}`)) return 'active'
  }

  return (
    <Wrapper>
      <Title>
        <AccountName status={false}>{user.username}</AccountName>
        <Button value='Logout' looks='green' onClick={() => dispatch(userLogout())} />
      </Title>
      <Resources>
        <Row>
          <Resource count={user.chaos} res='chaos' />
          <Resource count={user.bless} res='bless' />
          <Resource count={user.soul} res='soul' />
          <Resource count={user.life} res='life' />
          <Resource count={user.creation} res='creation' />
          <Resource count={user.rena} res='rena' />
          <Resource count={user.stone} res='stone' />
        </Row>
        <Row>
          <Resource count={user.boh} />
          <Resource count={user.box1} />
          <Resource count={user.box2} />
          <Resource count={user.box3} />
          <Resource count={user.box4} />
          <Resource count={user.box5} />
          <Resource count={user.heart} />
        </Row>
        <Row>
          <Resource width={135} label='Zen' color='green' count={233443434334} />
          <Resource width={100} label='Credits' color='orange' count={43332} />
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

const ResourceWrapper = styled.div<{ width: number; height: number; image?: string }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  box-shadow: 0px 0 15px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(63, 85, 114, 0.1);
  ${({ image }) =>
    image && `background: rgba(63, 85, 114, 0.1) url('/images/items/${image}') no-repeat center center/contain;`}
  display: flex;
  align-items: ${({ image }) => (!image ? `center` : `flex-start`)};
  justify-content: ${({ image }) => (!image ? `center` : `flex-end`)};
`

const ResourceValue = styled.span<{ color?: string }>`
  ${({ color }) => color && `color: ${color};`}
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
