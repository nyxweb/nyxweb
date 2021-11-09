import { Item } from './index'
import { Row, Wrapper, ItemPlaceholder } from './styles'

export const BoxOfKundun5 = () => {
  return (
    <Wrapper>
      <Row>
        <Item group={7} id={22} />
        <Item group={7} id={21} />
        <Item group={7} id={24} />
        <ItemPlaceholder />
        <Item group={7} id={28} />
      </Row>
      <Row>
        <Item group={8} id={22} />
        <Item group={8} id={21} />
        <Item group={8} id={24} />
        <Item group={8} id={23} />
        <Item group={8} id={28} />
      </Row>
      <Row>
        <Item group={9} id={22} />
        <Item group={9} id={21} />
        <Item group={9} id={24} />
        <Item group={9} id={23} />
        <Item group={9} id={28} />
      </Row>
      <Row>
        <Item group={10} id={22} />
        <Item group={10} id={21} />
        <Item group={10} id={24} />
        <Item group={10} id={23} />
        <Item group={10} id={28} />
      </Row>
      <Row>
        <Item group={11} id={22} />
        <Item group={11} id={21} />
        <Item group={11} id={24} />
        <Item group={11} id={23} />
        <Item group={11} id={28} />
      </Row>
      <Row>
        <Item group={5} id={11} />
        <Item group={0} id={20} />
        <Item group={4} id={19} />
        <Item group={0} id={21} />
        <Item group={2} id={12} />
      </Row>
    </Wrapper>
  )
}
