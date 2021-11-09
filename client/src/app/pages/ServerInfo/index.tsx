import { Link, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { MainContentBlock } from 'app/components'

import { BoxLoot } from './BoxLoot'
import { Monsters } from './Monsters'
import { RatesFormulas } from './RatesFormulas'
import { General } from './General'
import { Events } from './Events'

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
        </MainNav>
        <InfoWrapper>
          <Switch>
            <Route path='/server-info/general' component={General} />
            <Route path='/server-info/rates' component={RatesFormulas} />
            <Route path='/server-info/events' component={Events} />
            <Route path='/server-info/monsters' component={Monsters} />
            <Route path='/server-info/box-loot' component={BoxLoot} />
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
