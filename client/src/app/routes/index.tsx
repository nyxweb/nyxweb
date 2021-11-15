import { Switch, Route } from 'react-router-dom'

import { News } from '../pages/News'
import { Register } from '../pages/Register'
import { Download } from '../pages/Download'
import { Rankings } from '../pages/Rankings'
import { ServerInfo } from '../pages/ServerInfo'

// Private routes
import { Account, Character, Chats } from '../pages/UserArea'

// Admin routes

import { DoesntExist } from '../pages/404'
import { PrivateRoute } from './PrivateRoute'

export const Routes = () => {
  return (
    <Switch>
      <Route component={News} path='/' exact />
      <Route component={Register} path='/create-account' exact />
      <Route component={Download} path='/download-game' exact />
      <Route component={Rankings} path='/rankings' />
      <Route component={ServerInfo} path='/server-info' />
      <PrivateRoute component={Chats} path='/chats' />
      <PrivateRoute component={Account} path='/account' />
      <PrivateRoute component={Character} path='/character' />
      <Route component={DoesntExist} />
    </Switch>
  )
}
