import styled from 'styled-components'
import { Auction } from './Auction'
import { Market } from './Market'
import { ServerStatus } from './ServerStatus'

export const RightSidebar = () => {
  return (
    <Wrapper>
      <ServerStatus />
      <Market />
      <Auction />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 285px;
  background: url('/images/layout/sidebar-bg.jpg');
  margin: 50px 0 110px 0;
  position: relative;

  &:after {
    content: '';
    background: url('/images/layout/right-sidebar-icon.png') no-repeat;
    right: -4px;
    bottom: -4px;
    width: 25px;
    height: 25px;
    position: absolute;
  }
`
