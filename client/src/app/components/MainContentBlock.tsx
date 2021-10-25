import styled from 'styled-components'

export const MainContentBlock: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  margin: 20px;
  padding: 15px;
  background: rgba(63, 85, 114, 0.1);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
`
