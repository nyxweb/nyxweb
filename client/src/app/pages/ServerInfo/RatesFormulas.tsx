import styled from 'styled-components'

export const RatesFormulas = () => {
  return (
    <Wrapper>
      <Title>Chaos Machine</Title>
      <Group>
        <table>
          <thead>
            <tr>
              <th>level</th>
              <th>luck</th>
              <th>success rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>+10</td>
              <td>✔️</td>
              <td>95%</td>
            </tr>
            <tr>
              <td>+11</td>
              <td>✔️</td>
              <td>90%</td>
            </tr>
            <tr>
              <td>+12</td>
              <td>✔️</td>
              <td>85%</td>
            </tr>
            <tr>
              <td>+13</td>
              <td>✔️</td>
              <td>80%</td>
            </tr>
            <tr>
              <td colSpan={4}></td>
            </tr>
            <tr>
              <td>+10</td>
              <td>❌</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>+11</td>
              <td>❌</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>+12</td>
              <td>❌</td>
              <td>60%</td>
            </tr>
            <tr>
              <td>+13</td>
              <td>❌</td>
              <td>50%</td>
            </tr>
          </tbody>
        </table>
      </Group>
      <Title>Jewels</Title>
      <Group>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>luck</th>
              <th>success rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Align>
                  <img src='/images/items/14/13.gif' alt='job' /> Jewel of Bless
                </Align>
              </td>
              <td>n/a</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>
                <Align>
                  <img src='/images/items/14/14.gif' alt='jos' /> Jewel of Soul
                </Align>
              </td>
              <td>✔️</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>
                <Align>
                  <img src='/images/items/14/14.gif' alt='jos' /> Jewel of Soul
                </Align>
              </td>
              <td>❌</td>
              <td>60%</td>
            </tr>
            <tr>
              <td>
                <Align>
                  <img src='/images/items/14/16.gif' alt='jol' /> Jewel of Life
                </Align>
              </td>
              <td>✔️</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>
                <Align>
                  <img src='/images/items/14/16.gif' alt='jol' /> Jewel of Life
                </Align>
              </td>
              <td>❌</td>
              <td>60%</td>
            </tr>
          </tbody>
        </table>
      </Group>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Title = styled.div`
  border-bottom: 1px solid rgba(63, 85, 114, 0.4);
  font-size: 23px;
  color: #7792bb;
  padding: 15px;
`

const Group = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const Align = styled.div`
  display: inline-flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }
`
