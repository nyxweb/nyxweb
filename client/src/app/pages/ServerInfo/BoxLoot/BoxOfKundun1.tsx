import { Item } from './index'
import { Row, Wrapper } from './styles'

export const BoxOfKundun1 = () => {
  return (
    <Wrapper>
      <Row>
        <Item group={7} id={4} />
        <Item group={7} id={0} />
        <Item group={7} id={11} />
      </Row>
      <Row>
        <Item group={8} id={4} />
        <Item group={8} id={0} />
        <Item group={8} id={11} />
      </Row>
      <Row>
        <Item group={9} id={4} />
        <Item group={9} id={0} />
        <Item group={9} id={11} />
      </Row>
      <Row>
        <Item group={10} id={4} />
        <Item group={10} id={0} />
        <Item group={10} id={11} />
      </Row>
      <Row>
        <Item group={11} id={4} />
        <Item group={11} id={0} />
        <Item group={11} id={11} />
      </Row>
      <Row>
        <Item group={5} id={5} />
        <Item group={6} id={4} />
        <Item group={0} id={5} />
        <Item group={6} id={2} />
        <Item group={2} id={8} />
        <Item group={6} id={0} />
        <Item group={4} id={12} />
      </Row>
      <Row>
        <Item group={13} id={12} />
        <Item group={13} id={13} />
        <Item group={13} id={28} />
        <Item group={13} id={8} />
        <Item group={13} id={9} />
        <Item group={13} id={24} />
        <Item group={0} id={0} />
      </Row>
    </Wrapper>
  )
}
