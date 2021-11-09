import { Item } from './index'
import { Row, Wrapper, ItemPlaceholder } from './styles'

export const BoxOfKundun4 = () => {
  return (
    <Wrapper>
      <Row>
        <Item group={7} id={18} />
        <Item group={7} id={16} />
        <Item group={7} id={19} />
        <ItemPlaceholder />
        <Item group={7} id={27} />
      </Row>
      <Row>
        <Item group={8} id={18} />
        <Item group={8} id={16} />
        <Item group={8} id={19} />
        <Item group={8} id={20} />
        <Item group={8} id={27} />
      </Row>
      <Row>
        <Item group={9} id={18} />
        <Item group={9} id={16} />
        <Item group={9} id={19} />
        <Item group={9} id={20} />
        <Item group={9} id={27} />
      </Row>
      <Row>
        <Item group={10} id={18} />
        <Item group={10} id={16} />
        <Item group={10} id={19} />
        <Item group={10} id={20} />
        <Item group={10} id={27} />
      </Row>
      <Row>
        <Item group={11} id={18} />
        <Item group={11} id={16} />
        <Item group={11} id={19} />
        <Item group={11} id={20} />
        <Item group={11} id={27} />
      </Row>
      <Row>
        <Item group={5} id={9} />
        <Item group={0} id={19} />
        <Item group={4} id={17} />
        <Item group={0} id={31} />
        <Item group={2} id={11} />
      </Row>
      <Row>
        <Item group={6} id={15} />
        <Item group={6} id={12} />
        <ItemPlaceholder />
        <Item group={0} id={16} />
        <Item group={6} id={9} />
      </Row>
    </Wrapper>
  )
}
