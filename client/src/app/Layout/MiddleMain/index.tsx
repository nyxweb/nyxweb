import styled from 'styled-components'

export const MiddleMain: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <div>{children}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 690px;
  position: relative;
  background: url('/images/layout/content-bg.jpg');

  &:before {
    content: '';
    background: url('/images/layout/top-content-icon.png') no-repeat;
    left: 50%;
    margin-left: -71px;
    top: -41px;
    width: 143px;
    height: 74px;
    position: absolute;
    z-index: 11;
  }

  &:after {
    content: '';
    background: url('/images/layout/bottom-content-icon.png') no-repeat;
    background-size: 720px 40px;
    left: -30px;
    bottom: -12px;
    width: 720px;
    height: 40px;
    position: absolute;
  }
`
