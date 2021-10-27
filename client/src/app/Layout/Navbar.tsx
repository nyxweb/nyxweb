import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface MenuProps {
  path: string
  label: string
}

export const Navbar = () => {
  const isPageActive = (path: string) =>
    path === window.location.pathname || (window.location.pathname.startsWith(path) && path !== '/')
      ? 'active'
      : undefined

  const MenuLink: React.FC<MenuProps> = ({ path, label }) => (
    <Link to={path} className={isPageActive(path)}>
      <span>{label}</span>
      <div className='underline'>
        <div className='line' />
      </div>
    </Link>
  )

  return (
    <Wrapper>
      <Container>
        <MenuLink path='/' label='News' />
        <MenuLink path='/create-account' label='Create Account' />
        <MenuLink path='/download-game' label='Download Game' />
        <MenuLink path='/rankings' label='Rankings' />
        <MenuLink path='/server-info' label='Server Information' />
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: rgba(0, 0, 0, 0.3);
  transition: 0.4s;
  z-index: 1000;
`

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;

  a {
    position: relative;
    line-height: 64px;
    height: 64px;
    text-transform: uppercase;
    padding: 0 20px;
    color: #b7cdef;
    font-size: 16px;

    .underline {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      display: flex;
      justify-content: center;

      .line {
        width: 0%;
        height: 100%;
        background: rgba(200, 221, 241, 0.5);
        transition: 0.2s ease-in-out;
      }
    }

    &:hover,
    &.active {
      color: #c8ddf1;
      text-shadow: 0px 0px 10px rgba(200, 221, 241, 0.7);

      .line {
        width: 100%;
      }
    }
  }
`
