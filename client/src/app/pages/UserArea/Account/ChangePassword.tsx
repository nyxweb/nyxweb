import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { Button, MainContentBlock } from 'app/components'
import styled from 'styled-components'
import { ToastError } from 'typings'

interface IForm {
  email: string
  currentPassword: string
  newPassword: string
  repeatNewPassword: string
}

export const ChangePassword = () => {
  const [form, setForm] = useState<IForm>({
    email: '',
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.newPassword !== form.repeatNewPassword) return toast.error(`Entered passwords do not match.`)

    await toast
      .promise(axios.post('/users/account/password', form), {
        pending: 'Changing password...',
        success: 'Your password has been changed!',
        error: {
          render({ data }: ToastError) {
            return data?.response?.data?.error || data?.message
          },
        },
      })
      .catch(() => {})
  }

  return (
    <MainContentBlock>
      <Form onSubmit={handleSubmit}>
        <input type='text' name='username' style={{ display: 'none' }} />
        <input type='password' name='password' style={{ display: 'none' }} />
        <input
          type='text'
          placeholder='E-Mail Address'
          value={form.email}
          onChange={(e) => setForm((form) => ({ ...form, email: e.target.value }))}
          required
        />
        <input
          type='password'
          placeholder='Current password'
          value={form.currentPassword}
          onChange={(e) => setForm((form) => ({ ...form, currentPassword: e.target.value }))}
          required
        />
        <input
          type='password'
          placeholder='New password'
          value={form.newPassword}
          onChange={(e) => setForm((form) => ({ ...form, newPassword: e.target.value }))}
          required
        />
        <input
          type='password'
          placeholder='Repeat New password'
          value={form.repeatNewPassword}
          onChange={(e) => setForm((form) => ({ ...form, repeatNewPassword: e.target.value }))}
          required
        />
        <Button value='Change Password' type='submit' />
      </Form>
    </MainContentBlock>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 220px;
  margin: auto;

  & > * {
    margin: 5px;
  }
`
