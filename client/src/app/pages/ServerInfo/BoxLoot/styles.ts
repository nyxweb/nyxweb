import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.3);

  img {
    width: 125px;
    height: 190px;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 25px 0;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const ItemPlaceholder = styled.div<{ width?: number }>`
  width: ${({ width }) => width || 125}px;
`
