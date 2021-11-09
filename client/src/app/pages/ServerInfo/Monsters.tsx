import styled from 'styled-components'

export const Monsters = () => {
  return (
    <Wrapper>
      <Title>Lorencia</Title>
      <Group>
        <table>
          <thead>
            <tr>
              <th>type</th>
              <th>monsters</th>
              <th>count</th>
              <th>coordinates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>spot</td>
              <td>Spiders</td>
              <td>10</td>
              <td>220 220</td>
            </tr>
            <tr>
              <td>spawn</td>
              <td>Skeleton</td>
              <td>10</td>
              <td>220 220</td>
            </tr>
            <tr>
              <td>spot</td>
              <td>Elite Bull Fighter</td>
              <td>10</td>
              <td>220 220</td>
            </tr>
            <tr>
              <td>spawn</td>
              <td>Lich</td>
              <td>10</td>
              <td>220 220</td>
            </tr>
            <tr>
              <td>spawn</td>
              <td>Bull Fighter & Giant</td>
              <td>12</td>
              <td>220 220</td>
            </tr>
          </tbody>
        </table>
      </Group>
      <Title>Davias</Title>
      <Group>
        <table>
          <thead>
            <tr>
              <th>type</th>
              <th>monsters</th>
              <th>count</th>
              <th>coordinates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>spot</td>
              <td>Spiders</td>
              <td>10</td>
              <td>220 220</td>
            </tr>
            <tr>
              <td>spawn</td>
              <td>Skeleton</td>
              <td>10</td>
              <td>220 220</td>
            </tr>
            <tr>
              <td>spot</td>
              <td>Elite Bull Fighter</td>
              <td>10</td>
              <td>220 220</td>
            </tr>
            <tr>
              <td>spawn</td>
              <td>Lich</td>
              <td>10</td>
              <td>220 220</td>
            </tr>
            <tr>
              <td>spawn</td>
              <td>Bull Fighter & Giant</td>
              <td>12</td>
              <td>220 220</td>
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
