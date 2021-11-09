import styled from 'styled-components'

import { guildHexDecode } from 'utils'

interface Props {
  markHex: string
  size?: number
  style?: React.CSSProperties
}

export const GuildMark: React.FC<Props> = ({ markHex, size = 40, style }) => {
  const colors = markHex.split('').map((hexCode) => guildHexDecode(hexCode))

  return (
    <Wrapper size={size} style={style}>
      {colors.map((color, key) => (
        <Cell key={key} bg={color} size={size}></Cell>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ size: number }>`
  display: inline-block;
  overflow: hidden;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const Cell = styled.div<{ bg: string; size: number }>`
  background-color: ${({ bg }) => bg};
  width: ${({ size }) => size / 8}px;
  height: ${({ size }) => size / 8}px;
  float: left;
`
