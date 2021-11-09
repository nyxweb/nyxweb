import { Row, Wrapper, ItemPlaceholder } from './styles'

export const BoxOfKundun5 = () => {
  return (
    <Wrapper>
      <Row>
        <img src='/images/items/equipped/darksoul.jpg' alt='darksoul' />
        <img src='/images/items/equipped/greatdragon.jpg' alt='greatdragon' />
        <img src='/images/items/equipped/redspirit.jpg' alt='redspirit' />
        <img src='/images/items/equipped/hurricane.jpg' alt='hurricane' />
      </Row>
      <Row>
        <img src='/images/items/equipped/darkmaster.jpg' alt='darkmaster' />
        <img src='/images/items/equipped/knightblade.jpg' alt='knightblade' />
        <img src='/images/items/equipped/greatraincrossbow.jpg' alt='greatraincrossbow' />
        <img src='/images/items/equipped/blackreignblade.jpg' alt='blackreignblade' />
      </Row>
      <Row>
        <img src='/images/items/equipped/greatlordscepter.jpg' alt='greatlordscepter' />
        <img src='/images/items/equipped/kundunstaff.jpg' alt='kundunstaff' />
        <ItemPlaceholder />
        <ItemPlaceholder />
      </Row>
    </Wrapper>
  )
}
