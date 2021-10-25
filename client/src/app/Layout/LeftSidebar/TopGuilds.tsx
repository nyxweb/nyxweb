import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { SideContentBlock } from 'app/components'

export const TopGuilds = () => {
  const history = useHistory()

  const linkToGuildPage = (name: string) => {
    history.push(`/guild/${name}`)
  }

  return (
    <SideContentBlock title='top guilds' desc='most powerful guilds'>
      <Wrapper>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: 'left' }}>name</th>
              <th>membs</th>
              <th>resets</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => linkToGuildPage('NyxMu')}>
              <td>1</td>
              <td style={{ textAlign: 'left' }}>NyxMu</td>
              <td>44</td>
              <td>465</td>
              <td style={{ padding: 0 }}>mar</td>
            </tr>
            <tr onClick={() => linkToGuildPage('NyxMu')}>
              <td>2</td>
              <td style={{ textAlign: 'left' }}>NyxMu</td>
              <td>44</td>
              <td>465</td>
              <td style={{ padding: 0 }}>mar</td>
            </tr>
            <tr onClick={() => linkToGuildPage('NyxMu')}>
              <td>3</td>
              <td style={{ textAlign: 'left' }}>NyxMu</td>
              <td>44</td>
              <td>465</td>
              <td style={{ padding: 0 }}>mar</td>
            </tr>
            <tr onClick={() => linkToGuildPage('NyxMu')}>
              <td>4</td>
              <td style={{ textAlign: 'left' }}>NyxMu</td>
              <td>44</td>
              <td>465</td>
              <td style={{ padding: 0 }}>mar</td>
            </tr>
            <tr onClick={() => linkToGuildPage('NyxMu')}>
              <td>5</td>
              <td style={{ textAlign: 'left' }}>NyxMu</td>
              <td>44</td>
              <td>465</td>
              <td style={{ padding: 0 }}>mar</td>
            </tr>
            <tr>
              <td colSpan={5}>no guilds found...</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </SideContentBlock>
  )
}

const Wrapper = styled.div`
  margin: 0 -10px;

  table tbody tr,
  table tbody td {
    cursor: url('/images/main/pointer.cur'), pointer;
  }
`
