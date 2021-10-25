import styled from 'styled-components'

interface Props {
  active?: boolean
  styles?: 'light' | 'dark'
}

export const Loader: React.FC<Props> = ({ active = true, styles = 'dark' }) => {
  return (
    <Wrapper className={`Loader ${styles} ${active ? 'active' : ''}`}>
      <img className='logo' src='/images/logo.png' alt='mu logo' />
      <div className='container'>
        <div className={`fill ${styles}`} />
      </div>
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  &.active {
    opacity: 1;
    pointer-events: all;
  }

  &.dark {
    top: 0;
    left: 0;
    position: fixed;
    background: url('/images/layout/content-bg.jpg');
  }

  & img.logo {
    width: 100px;
    height: 100px;
    margin-top: 20px;
  }

  & .container {
    position: relative;
    margin: 20px;
    width: 120px;
    height: 3px;
    border-radius: 2px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);

    & .fill {
      position: absolute;
      background: rgba(9, 73, 116, 0.712);
      width: 100%;
      height: 100%;
      animation: loader 1.5s ease-in-out forwards infinite;
    }

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
  }
`
