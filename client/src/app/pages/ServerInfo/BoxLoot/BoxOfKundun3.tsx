import { Item } from './index'
import { Row, Wrapper, ItemPlaceholder } from './styles'

export const BoxOfKundun3 = () => {
  return (
    <Wrapper>
      <Row>
        <Item group={7} id={3} />
        <Item group={7} id={1} />
        <Item group={7} id={14} />
        <ItemPlaceholder />
        <Item group={7} id={26} />
      </Row>
      <Row>
        <Item group={8} id={3} />
        <Item group={8} id={1} />
        <Item group={8} id={14} />
        <Item group={8} id={15} />
        <Item group={8} id={26} />
      </Row>
      <Row>
        <Item group={9} id={3} />
        <Item group={9} id={1} />
        <Item group={9} id={14} />
        <Item group={9} id={15} />
        <Item group={9} id={26} />
      </Row>
      <Row>
        <Item group={10} id={3} />
        <Item group={10} id={1} />
        <Item group={10} id={14} />
        <Item group={10} id={15} />
        <Item group={10} id={26} />
      </Row>
      <Row>
        <Item group={11} id={3} />
        <Item group={11} id={1} />
        <Item group={11} id={14} />
        <Item group={11} id={15} />
        <Item group={11} id={26} />
      </Row>
      <Row>
        <Item group={5} id={10} />
        <Item group={0} id={14} />
        <Item group={4} id={16} />
        <Item group={0} id={18} />
        <Item group={2} id={10} />
      </Row>
      <Row>
        <Item group={6} id={14} />
        <Item group={6} id={8} />
        <Item group={4} id={14} />
        <Item group={5} id={8} />
        <Item group={6} id={7} />
      </Row>
    </Wrapper>
  )
}
