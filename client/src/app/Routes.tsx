import { Switch, Route } from 'react-router-dom'

import { News } from './pages/News'
import { Register } from './pages/Register'
import { Download } from './pages/Download'
import { TopPlayers } from './pages/TopPlayers'
import { TopGuilds } from './pages/TopGuilds'
import { ServerInformation } from './pages/ServerInformation'

import { Character } from './pages/Character'

import { FourOhFour } from './pages/404'

interface ROUTE {
  label: string
  path: string
  component: React.FC
  exact?: boolean
  sensitive?: boolean
  strict?: boolean
}

export const ROUTES: ROUTE[] = [
  {
    component: News,
    path: '/',
    label: 'News',
    exact: true,
  },
  {
    component: Register,
    path: '/create-account',
    label: 'Create Account',
    exact: true,
  },
  {
    component: Download,
    path: '/download-game',
    label: 'Download Game',
    exact: true,
  },
  {
    component: TopPlayers,
    path: '/top-players',
    label: 'Top Players',
    exact: false,
  },
  {
    component: TopGuilds,
    path: '/top-guilds',
    label: 'Top Guilds',
    exact: false,
  },
  {
    component: ServerInformation,
    path: '/server-information',
    label: 'Server Information',
    exact: false,
  },
]

export const Routes = () => {
  return (
    <Switch>
      {ROUTES.map((route, key) => (
        <Route key={key} component={route.component} path={route.path} exact={route.exact} />
      ))}
      <Route component={Character} path='/character' />
      <Route component={FourOhFour} />
    </Switch>
  )
}
