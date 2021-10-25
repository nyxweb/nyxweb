import styled from 'styled-components'

export const Header = () => {
  return (
    <Wrapper>
      <Fog>
        <div className='x1' />
        <div className='x2' />
        <div className='x3' />
      </Fog>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  position: relative;
  height: 455px;
`

const Fog = styled.div`
  position: absolute;
  top: 240px;
  left: 0;
  width: 100%;
  height: 600px;

  & > div {
    position: absolute;
    display: block;
    background: url('/images/layout/effects/fog.png') no-repeat;
    transform-origin: 50% 100%;
    bottom: 0;
    left: -577px;
    width: 2354px;
    height: 1300px;
    opacity: 0;
  }

  .x1 {
    -webkit-animation: spreadSmog 7s infinite linear;
    animation: spreadSmog 7s infinite linear;
  }

  .x2 {
    -webkit-animation: spreadSmog 15s infinite linear;
    animation: spreadSmog 15s infinite linear;
  }

  .x3 {
    -webkit-animation: spreadSmog 40s infinite linear;
    animation: spreadSmog 40s infinite linear;
  }

  @keyframes spreadSmog {
    0% {
      transform: scale(0.5);
      -webkit-transform: scale(0.5);
      opacity: 0;
    }
    45% {
      transform: scale(0.75);
      -webkit-transform: scale(0.75);
      opacity: 1;
    }
    90% {
      transform: scale(1);
      -webkit-transform: scale(1);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      -webkit-transform: scale(1);
      opacity: 0;
    }
  }
`
