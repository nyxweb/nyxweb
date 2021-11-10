import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { Button, MainContentBlock } from 'app/components'
import styled from 'styled-components'

interface IForm {
  currentPassword: string
  newPassword: string
  repeatNewPassword: string
}

export const ChangePassword = () => {
  const [form, setForm] = useState<IForm>({
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.newPassword !== form.repeatNewPassword) return toast.error(`Entered passwords do not match.`)

    try {
      setLoading(true)
      await axios.post('/users/password', form)
      toast.success(`Your password was changed successfully!`)
    } catch (error: any) {
      toast.error(error.response?.data.error || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainContentBlock>
      <Form onSubmit={handleSubmit}>
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
        <Button value='Change Password' type='submit' loading={loading} />
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
