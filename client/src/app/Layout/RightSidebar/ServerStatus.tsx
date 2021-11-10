import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ServerStatus = () => {
  const serverStatus = true
  const onlineCount = 178
  const maxOnline = 300
  const serverName = 'NyxMu NoReset'

  return (
    <Wrapper>
      <StatusImage status={serverStatus} />
      <Details>
        <ServerName status={serverStatus}>
          <span>{serverName}</span>
          <span>
            Online{` `}
            <span className='count'>{!serverStatus || onlineCount <= 0 ? 0 : onlineCount}</span>
          </span>
        </ServerName>
        <Progress>
          <Loader style={{ width: serverStatus ? (onlineCount / maxOnline) * 100 : 0 + '%' }} />
        </Progress>
        <Link to='server-info'>Server Information</Link>
      </Details>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 90px;
  box-shadow: 0px 5px 20px -2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`

const StatusImage = styled.div<{ status: boolean }>`
  position: relative;
  margin-left: 5px;
  width: 74px;
  height: 74px;
  line-height: 77px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ status }) => {
    if (status)
      return `
        background: url('/images/partials/server-green.png') no-repeat center
          center/cover;

        &:after {
          content: 'ON';
          color: #18a824;
        }
      `
    else
      return `
        background: url('/images/partials/server-blue.png') no-repeat center
          center/cover;

        &:after {
          content: 'OFF';
          color: #f00000;
        }
      `
  }}
`

const Details = styled.div`
  width: 170px;
`

const ServerName = styled.div<{ status: boolean }>`
  display: flex;
  justify-content: space-between;

  & :first-child {
    color: white;
  }

  .count {
    color: ${({ status }) => (status ? '#27a067' : '#ff0000')};
  }
`

const Progress = styled.div`
  background: #0a0a0a;
  border-radius: 2px;
  margin: 6px 0;
`

const Loader = styled.div`
  width: 0;
  height: 8px;
  background: #12a2e7;
  box-shadow: 0 0 5px 0 #1584b8;
  transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`
