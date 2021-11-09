import { Link, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { MainContentBlock } from 'app/components'

import { BoxLoot } from './BoxLoot'

export const ServerInfo = () => {
  const isActive = (page: string) => {
    return window.location.pathname.startsWith(`/server-info/${page}`) ? 'active' : 'inactive'
  }

  return (
    <div>
      <MainContentBlock>
        <MainNav>
          <MainLink to='/server-info/general' className={isActive('general')}>
            General
          </MainLink>
          <MainLink to='/server-info/rates' className={isActive('rates')}>
            Rates & Formulas
          </MainLink>
          <MainLink to='/server-info/events' className={isActive('events')}>
            Events
          </MainLink>
          <MainLink to='/server-info/monsters' className={isActive('monsters')}>
            Monster Spawns
          </MainLink>
          <MainLink to='/server-info/box-loot' className={isActive('box-loot')}>
            Box Loot
          </MainLink>
          <MainLink to='/server-info/gold' className={isActive('gold')}>
            Gold
          </MainLink>
        </MainNav>
        <InfoWrapper>
          <Switch>
            <Route path='/server-info/box-loot' component={BoxLoot} />
            {/* <Route path='/server-info' component={General} /> */}
          </Switch>
        </InfoWrapper>
      </MainContentBlock>
    </div>
  )
}

const MainNav = styled.div``

const MainLink = styled(Link)`
  display: inline-flex;
  padding: 0 15px;
  height: 40px;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  &.active {
    background-color: rgba(0, 0, 0, 0.4);
    color: #ffffff;
  }
`

const InfoWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
`
