import styled from 'styled-components'

import { Navbar } from './Navbar'
import { Header } from './Header'
import { LeftSidebar } from './LeftSidebar'
import { MiddleMain } from './MiddleMain'
import { RightSidebar } from './RightSidebar'
import { Footer } from './Footer'
import { MainLoader } from './MainLoader'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Root>
        <AppWrapper>
          <Header />
          <MainContent>
            <LeftSidebar />
            <MiddleMain>{children}</MiddleMain>
            <RightSidebar />
          </MainContent>
          <Footer />
          <MainLoader active={false} type='dark' />
        </AppWrapper>
        {/* <ReactNotification /> */}
      </Root>
    </>
  )
}

const Root = styled.div`
  max-width: 1920px;
  min-width: 1280px;
  margin: 0 auto;
  background: url('/images/layout/lightning.gif') no-repeat top 170px center,
    url('/images/layout/top-bg.png') no-repeat top center,
    url('/images/layout/bottom-bg.jpg') no-repeat bottom center;
  overflow-x: hidden;
`

const AppWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;

  span.highlight {
    color: #c8ddf1;
  }
`

const MainContent = styled.div`
  min-height: 1050px;
  display: flex;
  position: relative;

  &:before {
    content: '';
    background: url('/images/layout/left-container-icon.png') no-repeat;
    left: -35px;
    top: 16px;
    width: 74px;
    height: 73px;
    position: absolute;
    z-index: 1;
  }

  &:after {
    content: '';
    background: url('/images/layout/right-container-icon.png') no-repeat;
    right: -35px;
    top: 16px;
    width: 74px;
    height: 73px;
    position: absolute;
    z-index: 1;
  }
`
