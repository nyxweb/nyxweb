import styled from 'styled-components'

interface Props {
  active?: boolean
  type?: 'light' | 'dark'
}

export const MainLoader = ({ active, type }: Props) => {
  return (
    <Wrapper className={`${type} ${active ? 'active' : 'inactive'}`}>
      <img
        className='logo'
        width={100}
        height={100}
        src='/images/logo.png'
        alt='MuOnline'
      />
      <Container>
        <Fill className={type} />
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0;
  transition: 0.2s ease-in-out;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: all;
  }

  &.dark {
    top: 0;
    left: 0;
    z-index: 15;
    position: fixed;
    background: url('/images/layout/content-bg.jpg');
  }

  & img.logo {
    margin-top: 20px;
  }
`

const Container = styled.div`
  position: relative;
  margin: 20px;
  width: 120px;
  height: 3px;
  border-radius: 2px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
`

const Fill = styled.div`
  position: absolute;
  background: rgba(9, 73, 116, 0.712);
  width: 100%;
  height: 100%;
  animation: loader 1.5s ease-in-out forwards infinite;

  @keyframes loader {
    0% {
      width: 0%;
      left: 0;
    }
    50% {
      width: 100%;
      left: 0;
    }
    100% {
      left: 100%;
    }
  }
`
