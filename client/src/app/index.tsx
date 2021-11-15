import { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { GlobalStyle } from 'styles/globals'
import { Layout } from 'app/Layout'
import { Routes } from 'app/routes'
import { Loader } from 'app/components'
import { useAppDispatch, useAppSelector } from 'store'
import { userVerify } from 'store/user'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const App = () => {
  const dispatch = useAppDispatch()
  const authorized = useAppSelector((state) => state.user.authorized)

  useEffect(() => {
    dispatch(userVerify())
  }, [dispatch])

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Layout>
            <Routes />
          </Layout>
        </Switch>
        <Loader active={authorized === 'loading'} />
      </Router>
      <ToastContainer autoClose={5000} closeButton={false} theme='dark' />
    </>
  )
}
