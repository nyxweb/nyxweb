import { Item } from './index'
import { Row, Wrapper } from './styles'

export const BoxOfKundun2 = () => {
  return (
    <Wrapper>
      <Row>
        <Item group={7} id={7} />
        <Item group={7} id={9} />
        <Item group={7} id={12} />
        <Item group={7} id={25} />
      </Row>
      <Row>
        <Item group={8} id={7} />
        <Item group={8} id={9} />
        <Item group={8} id={12} />
        <Item group={8} id={25} />
      </Row>
      <Row>
        <Item group={9} id={7} />
        <Item group={9} id={9} />
        <Item group={9} id={12} />
        <Item group={9} id={25} />
      </Row>
      <Row>
        <Item group={10} id={7} />
        <Item group={10} id={9} />
        <Item group={10} id={12} />
        <Item group={10} id={25} />
      </Row>
      <Row>
        <Item group={11} id={7} />
        <Item group={11} id={9} />
        <Item group={11} id={12} />
        <Item group={11} id={25} />
      </Row>
      <Row>
        <Item group={5} id={6} />
        <Item group={6} id={6} />
        <Item group={0} id={13} />
        <Item group={6} id={5} />
        <Item group={4} id={13} />
        <Item group={5} id={7} />
        <Item group={2} id={9} />
        <Item group={6} id={1} />
      </Row>
      <Row>
        <Item group={13} id={25} />
        <Item group={13} id={26} />
        <Item group={13} id={27} />
        <Item group={13} id={21} />
        <Item group={13} id={22} />
        <Item group={13} id={23} />
      </Row>
    </Wrapper>
  )
}
