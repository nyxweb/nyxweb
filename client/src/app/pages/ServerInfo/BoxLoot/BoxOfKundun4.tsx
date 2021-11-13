import { Row, Wrapper, ItemPlaceholder } from './styles'

export const BoxOfKundun4 = () => {
  return (
    <Wrapper>
      <Row>
        <img src='/images/items/equipped/grandsoul.jpg' alt='grandsoul' />
        <img src='/images/items/equipped/blackdragon.jpg' alt='blackdragon' />
        <img src='/images/items/equipped/divine.jpg' alt='divine' />
        <img src='/images/items/equipped/thunderhawk.jpg' alt='thunderhawk' />
      </Row>
      <Row>
        <img src='/images/items/equipped/darksteel.jpg' alt='darksteel' />
        <img src='/images/items/equipped/swordofarchangel.jpg' alt='swordofarchangel' />
        <img src='/images/items/equipped/saintcrossbow.jpg' alt='saintcrossbow' />
        <img src='/images/items/equipped/runeblade.jpg' alt='runeblade' />
      </Row>
      <Row>
        <img src='/images/items/equipped/lordscepter.jpg' alt='lordscepter' />
        <img src='/images/items/equipped/swordofdestruction.jpg' alt='swordofdestruction' />
        <img src='/images/items/equipped/dragonsoulstaff.jpg' alt='dragonsoulstaff' />
        <img src='/images/items/equipped/grandsoulshield.jpg' alt='grandsoulshield' />
      </Row>
      <Row>
        <img src='/images/items/equipped/dragonshield.jpg' alt='dragonshield' />
        <ItemPlaceholder />
        <ItemPlaceholder />
        <ItemPlaceholder />
      </Row>
    </Wrapper>
  )
}
