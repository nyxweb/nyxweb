import { InfoBlob, MainContentBlock } from 'app/components'

export const StatsAdder = () => {
  return (
    <MainContentBlock>
      <InfoBlob>
        <div>To add your stats, please use the ingame commands:</div>
        <div>
          <ul>
            <li>/addstr {`<points>`}</li>
            <li>/addagi {`<points>`}</li>
            <li>/addvit {`<points>`}</li>
            <li>/addene {`<points>`}</li>
            <li>/addcmd {`<points>`}</li>
          </ul>
        </div>
      </InfoBlob>
    </MainContentBlock>
  )
}
