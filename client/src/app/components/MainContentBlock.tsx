import styled from 'styled-components'

interface Props {
  padding?: number
  margin?: number
}

export const MainContentBlock: React.FC<Props> = ({ children, padding = 15, margin = 20 }) => {
  return (
    <Wrapper padding={padding} margin={margin}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ padding: number; margin: number }>`
  margin: ${({ margin }) => margin}px;
  padding: ${({ padding }) => padding}px;
  background: rgba(63, 85, 114, 0.1);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
`
