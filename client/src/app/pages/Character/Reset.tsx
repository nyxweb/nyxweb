import styled from 'styled-components'

import { Button, MainContentBlock } from 'app/components'

export const Reset = () => {
  return (
    <MainContentBlock>
      <Form>
        <select>
          <option>Dea7h</option>
          <option>Detash</option>
          <option>Detassadads</option>
        </select>
        <Button value='Reset' />
      </Form>
      <Info>
        <ul>
          <li>Required level for reset is 400</li>
          <li>Required zen for reset is 200,000,000 x reset number</li>
          <li>You cannot wear items when performing a restart</li>
        </ul>
      </Info>
    </MainContentBlock>
  )
}

const Info = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px 0;
`

const Form = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 0 5px;
  }
`
