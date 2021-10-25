import styled from 'styled-components'

export const Footer = () => {
  return (
    <Wrapper>
      <ScrollUp
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      <Copyright>
        <span>Nyx MuOnline</span>
        <span>NyxWeb v3 developed by Dea7h</span>
      </Copyright>
      <Menu>{/* <Link to='/news'>News</Link> */}</Menu>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  position: relative;
  color: #455468;
  line-height: 1.3;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ScrollUp = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80px;
  height: 80px;
  background: url('/images/layout/scroll-up.png') no-repeat center center/cover;
  cursor: url('/images/main/pointer.cur'), pointer;
`

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;

  span:first-of-type {
    font-size: 14px;
  }
`

const Menu = styled.div`
  a {
    color: #455468;
    text-transform: uppercase;
    font-size: 12px;

    &:hover {
      color: #ffffff;
    }

    &:after {
      content: '|';
      color: #455468;
      margin: 0 10px;
    }

    &:last-of-type:after {
      content: '';
      margin: 0 0 0 10px;
    }
  }
`
