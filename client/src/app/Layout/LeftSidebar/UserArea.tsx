import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { v4 as uuid } from 'uuid'

import { Button } from 'app/components'
import { useAppDispatch, useAppSelector } from 'store'
import { userLogout } from 'store/user'
import resources from 'utils/items.json'

interface Props {
  count: number
  width?: number
  height?: number
  color?: string
  label?: string
  group?: number
  id?: number
  level?: number
  onClick?: () => void
}

const RES = resources as Record<
  number,
  {
    title: string
    items: Record<
      number,
      {
        name: string
        x: number
        y: number
        options: {
          excellent: number | boolean
          additional: string | boolean
          skill?: boolean | 'tripple'
        }
        class?: number[]
        levels?: Record<number, string>
      }
    >
  }
>

const Resource: React.FC<Props> = ({ count, width = 30, height = 30, color, label, group, id, level, onClick }) => {
  const tooltipId = uuid()
  const ress = group && id ? RES[group].items[id] : null
  const resName = label || !ress ? label : ress.levels && level ? ress.levels[level] || ress.name : ress.name
  const itemImage = group && id ? `${group}/${id}${level ? `-${level}` : ''}.gif` : undefined

  return (
    <>
      <ResourceWrapper onClick={onClick} width={width} height={height} image={itemImage} data-tip={`${resName}: ${count}`} data-for={tooltipId}>
        {label ? (
          <>
            {label}
            <ResourceValue color={color}>{count.toLocaleString()}</ResourceValue>
          </>
        ) : (
          count !== 0 && <ResourceValue>{count}</ResourceValue>
        )}
      </ResourceWrapper>
      <ReactTooltip place='top' type='dark' effect='solid' offset={{ top: 10 }} id={tooltipId} />
    </>
  )
}

export const UserArea = () => {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const history = useHistory()

  if (!user) return null

  const getActiveClassName = (path: string) => {
    if (window.location.pathname.startsWith(`/${path}`)) return 'active'
  }

  return (
    <Wrapper>
      <Title>
        <AccountName status={false}>{user.memb___id}</AccountName>
        <Button value='Logout' looks='green' onClick={() => dispatch(userLogout())} />
      </Title>
      {user.resources && (
        <Resources>
          <Row>
            <Resource count={user.resources.chaos} group={12} id={15} />
            <Resource count={user.resources.bless} group={14} id={13} />
            <Resource count={user.resources.soul} group={14} id={14} />
            <Resource count={user.resources.life} group={14} id={16} />
            <Resource count={user.resources.creation} group={14} id={22} />
            <Resource count={user.resources.rena} group={14} id={21} level={0} />
            <Resource count={user.resources.stone} group={14} id={21} level={1} />
          </Row>
          <Row>
            <Resource count={user.resources.boh} group={14} id={11} level={1} />
            <Resource count={user.resources.box1} group={14} id={11} level={7} />
            <Resource count={user.resources.box2} group={14} id={11} level={8} />
            <Resource count={user.resources.box3} group={14} id={11} level={9} />
            <Resource count={user.resources.box4} group={14} id={11} level={10} />
            <Resource count={user.resources.box5} group={14} id={11} level={11} />
            <Resource count={user.resources.heart} group={14} id={11} level={3} />
          </Row>
          <Row>
            <Resource width={135} label='Zen' color='green' count={user.resources.zen} />
            <Resource width={100} label='Gold' color='orange' count={user.resources.gold} onClick={() => history.push('/account/get-gold')} />
          </Row>
        </Resources>
      )}
      <Spacer />
      <UserMenu>
        <Link to='/chats'>
          <MenuCategory className={getActiveClassName('chats')}>Chats and Support</MenuCategory>
        </Link>
        <Link to='/account'>
          <MenuCategory className={getActiveClassName('account')}>Account Management</MenuCategory>
        </Link>
        <Link to='/character'>
          <MenuCategory className={getActiveClassName('character')}>Character Management</MenuCategory>
        </Link>
        <Link to='/extra'>
          <MenuCategory className={getActiveClassName('extra')}>Extra Features</MenuCategory>
        </Link>
        {/* <Link to='/admin'>
          <MenuCategory className={getActiveClassName('admin')}>Administration</MenuCategory>
        </Link> */}
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
  ${({ image }) => image && `background: rgba(63, 85, 114, 0.1) url('/images/items/${image}') no-repeat center center/80% 80%;`}
  display: flex;
  align-items: ${({ image }) => (!image ? `center` : `flex-start`)};
  justify-content: ${({ image }) => (!image ? `center` : `flex-end`)};
`

const ResourceValue = styled.span<{ color?: string }>`
  ${({ color }) => color && `color: ${color};`}
  margin-left: 5px;
  ${({ color }) => !color && `padding: 0 2px; background-color: rgba(0, 0, 0, 0.5); border-radius: 5px; font-size: 11px;`}
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
