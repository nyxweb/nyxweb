import { useRef } from 'react'
import styled from 'styled-components'

interface Props {
  active: boolean
  closeModal: () => void
}

export const Modal: React.FC<Props> = ({ active, closeModal, children }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (contentRef.current?.contains(e.target as any)) return
    closeModal()
  }

  return (
    <Wrapper className={active ? 'active' : 'inactive'} onClick={handleClick}>
      <Content ref={contentRef}>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: 200ms ease-in-out;
  opacity: 0;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: all;
  }
`

const Content = styled.div`
  position: relative;
  min-width: 500px;
  min-height: 300px;
  background: rgba(20, 30, 43, 0.938) url('/images/layout/content-bg.jpg');
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.04);

  &:before {
    content: '';
    background: url('/images/layout/left-container-icon.png') no-repeat center center/cover;
    left: -30px;
    top: -30px;
    width: 60px;
    height: 60px;
    position: absolute;
    z-index: 1;
  }

  &:after {
    content: '';
    background: url('/images/layout/right-container-icon.png') no-repeat center center/cover;
    right: -30px;
    top: -30px;
    width: 60px;
    height: 60px;
    position: absolute;
    z-index: 1;
  }
`
