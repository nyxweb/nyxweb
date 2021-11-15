import { InfoBlob, MainContentBlock } from 'app/components'
import { Link } from 'react-router-dom'

export const GetGold = () => {
  return (
    <MainContentBlock>
      <InfoBlob>
        Ways to get gold:
        <ul>
          <li>In-game events made by our staff</li>
          <li>Weekly events (BC, DS, SKY)</li>
          <li>
            Selling items on <Link to='/extra/market'>the market</Link>
          </li>
        </ul>
      </InfoBlob>
    </MainContentBlock>
  )
}
