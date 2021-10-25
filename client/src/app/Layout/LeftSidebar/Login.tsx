import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from 'app/components'
import { useAppDispatch, useAppSelector } from 'store'
import { userLogin } from 'store/user'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const loginStatus = useAppSelector((state) => state.user.loginStatus)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
  }

  return (
    <Wrapper>
      <div className='title'>
        <span>User Area</span>
        <Link to='create-account'>New Account</Link>
      </div>
      <Form onSubmit={handleSubmit}>
        <input
          type='text'
          className='user'
          placeholder='Username'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          className='pass'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='group'>
          <Link to='recover-credentials'>Recover Credentials</Link>
          <Button type='submit' value='login' loading={loginStatus === 'loading'} />
        </div>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: url('/images/partials/login-block-bg.jpg') bottom no-repeat;
  padding: 20px;

  .title {
    display: flex;
    justify-content: space-between;

    a {
      color: #6fa5ff;
    }
  }
`

const Form = styled.form`
  margin: 20px 0 0 0;
  display: grid;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 7px 7px 7px 50px;
    font-size: 14px;
    background-repeat: no-repeat;
    background-position: left;
    height: 36px;

    &.user {
      background-image: url('/images/partials/login-icon.png');
    }

    &.pass {
      background-image: url('/images/partials/password-icon.png');
    }
  }

  .group {
    display: flex;
    align-self: center;
    justify-content: space-between;

    a {
      align-self: center;
    }

    button {
      width: 110px;
    }
  }
`
