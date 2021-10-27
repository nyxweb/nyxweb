import { Unauthorized } from 'app/pages/401'
import { Route, RouteProps } from 'react-router-dom'
import { useAppSelector } from 'store'

export const PrivateRoute: React.FC<RouteProps & { admin?: boolean }> = (props) => {
  const user = useAppSelector((state) => state.user)

  return user.authorized !== true || (props.admin && user.user?.ctl1_code !== '1') ? (
    <Unauthorized />
  ) : (
    <Route {...props} />
  )
}
