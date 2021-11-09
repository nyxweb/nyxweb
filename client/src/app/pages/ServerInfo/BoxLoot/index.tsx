import { Fragment } from 'react'
import styled from 'styled-components'
import { Route, Switch, Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import ReactTooltip from 'react-tooltip'

import items from 'utils/items.json'

import { BoxOfKundun1 } from './BoxOfKundun1'
import { BoxOfKundun2 } from './BoxOfKundun2'
import { BoxOfKundun3 } from './BoxOfKundun3'
import { BoxOfKundun4 } from './BoxOfKundun4'
import { BoxOfKundun5 } from './BoxOfKundun5'

export const BoxLoot = () => {
  const pagePrefix = '/server-info/box-loot'
  const isActive = (page: string) => {
    return window.location.pathname.startsWith(`${pagePrefix}/${page}`) ? 'active' : 'inactive'
  }

  return (
    <Wrapper>
      <SelectBox>
        <StyledLink to={`${pagePrefix}/star`} className={isActive('star')}>
          <img src='/images/items/14/11-1.gif' alt='star' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/sack`} className={isActive('sack')}>
          <img src='/images/items/14/11-2.gif' alt='sack' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/hol`} className={isActive('hol')}>
          <img src='/images/items/14/11-3.gif' alt='hol' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/silver`} className={isActive('silver')}>
          <img src='/images/items/14/11-5.gif' alt='silver' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/gold`} className={isActive('gold')}>
          <img src='/images/items/14/11-6.gif' alt='gold' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/boh`} className={isActive('boh')}>
          <img src='/images/items/14/11-7.gif' alt='boh' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/bok1`} className={isActive('bok1')}>
          <img src='/images/items/14/11-8.gif' alt='bok1' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/bok2`} className={isActive('bok2')}>
          <img src='/images/items/14/11-9.gif' alt='bok2' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/bok3`} className={isActive('bok3')}>
          <img src='/images/items/14/11-10.gif' alt='bok3' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/bok4`} className={isActive('bok4')}>
          <img src='/images/items/14/11-11.gif' alt='bok4' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/bok5`} className={isActive('bok5')}>
          <img src='/images/items/14/11-12.gif' alt='bok5' />
        </StyledLink>
        <StyledLink to={`${pagePrefix}/loh`} className={isActive('loh')}>
          <img src='/images/items/14/11-13.gif' alt='loh' />
        </StyledLink>
      </SelectBox>
      <ItemsContent>
        <Switch>
          <Route path={`${pagePrefix}/bok1`} component={BoxOfKundun1} />
          <Route path={`${pagePrefix}/bok2`} component={BoxOfKundun2} />
          <Route path={`${pagePrefix}/bok3`} component={BoxOfKundun3} />
          <Route path={`${pagePrefix}/bok4`} component={BoxOfKundun4} />
          <Route path={`${pagePrefix}/bok5`} component={BoxOfKundun5} />
        </Switch>
      </ItemsContent>
    </Wrapper>
  )
}

interface Props {
  group: number
  id: number
}

interface IItem {
  name: string
  x: number
  y: number
  options: {
    excellent: number
    additional: string
  }
  class: number[]
}

const ItemWrapper = styled.div`
  display: inline-flex;
  min-width: 64px;
  justify-content: center;
`

export const Item: React.FC<Props> = ({ group, id }) => {
  const item: IItem = (items as any)[group].items[id]
  const tooltip_id = uuid()

  return (
    <Fragment>
      <ItemWrapper data-tip={item.name} data-for={tooltip_id}>
        <img src={`/images/items/${group}/${id}.gif`} alt={item.name} />
      </ItemWrapper>
      <ReactTooltip place='top' type='dark' effect='solid' offset={{ top: 10 }} id={tooltip_id} />
    </Fragment>
  )
}

const Wrapper = styled.div``

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px 0;
`

const StyledLink = styled(Link)`
  border-radius: 5px;

  &.active {
    background-color: #1f2931;
  }
`

const ItemsContent = styled.div``
