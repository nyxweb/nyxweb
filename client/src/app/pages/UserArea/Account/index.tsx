import { Link, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Moment from 'react-moment'

import { PrivateRoute } from 'app/routes/PrivateRoute'
import { MainContentBlock, ReactLoader } from 'app/components'
import { useRequest } from 'hooks'

import { Logs } from './Logs'
import { ChangePassword } from './ChangePassword'

interface IAccountInfo {
  IsVip: 0 | 1
  VipExpirationTime: number
  appl_days: string
  bloc_code: '0' | '1'
  memb_stat: {
    ConnectStat: 0 | 1
    ConnectTM?: string
    DisConnectTM?: string
    IP?: string
  }
  logs: {
    date: string
    ip: string
  }[]
}

export const Account = () => {
  const [info, loading] = useRequest<IAccountInfo>('/users/account/info')
  const [ipify, loadingIpify] = useRequest<{ ip: string }>('https://api64.ipify.org/?format=json')

  return (
    <Wrapper>
      <MainContentBlock padding={0}>
        <TableWrapper>
          <table>
            <tbody>
              <tr>
                <td>
                  <VerticalAlign>
                    <img src='/images/icons/calendar.png' alt='' /> Member Since
                  </VerticalAlign>
                </td>
                <td>
                  {loading ? (
                    <ReactLoader size={17} />
                  ) : info?.appl_days ? (
                    <Moment fromNow withTitle>
                      {info?.appl_days}
                    </Moment>
                  ) : (
                    'n/a'
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <VerticalAlign>
                    <img src='/images/icons/calendar.png' alt='' /> Last Game Login
                  </VerticalAlign>
                </td>
                <td>
                  {loading ? (
                    <ReactLoader size={17} />
                  ) : info?.memb_stat.ConnectTM ? (
                    <Moment fromNow withTitle>
                      {info.memb_stat.ConnectTM}
                    </Moment>
                  ) : (
                    'n/a'
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <VerticalAlign>
                    <img src='/images/icons/ip.png' alt='' /> Last Game Login IP
                  </VerticalAlign>
                </td>
                <td>
                  {loading ? (
                    <ReactLoader size={17} />
                  ) : info?.memb_stat.IP ? (
                    <a href={`https://whatismyipaddress.com/ip/${info.memb_stat.IP}`} target='_blank' rel='noreferrer'>
                      {info.memb_stat.IP}
                    </a>
                  ) : (
                    'n/a'
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <VerticalAlign>
                    <img src='/images/icons/ip.png' alt='' /> Current IP
                  </VerticalAlign>
                </td>
                <td>{loadingIpify ? <ReactLoader size={17} /> : ipify?.ip || 'n/a'}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                  <VerticalAlign>
                    <img src='/images/icons/lightning.png' alt='' /> VIP Status
                  </VerticalAlign>
                </td>
                <td>
                  {loading ? (
                    <ReactLoader size={17} />
                  ) : info?.IsVip && info.VipExpirationTime > Date.now() / 1000 ? (
                    <>
                      <Moment fromNow ago withTitle>
                        {info.VipExpirationTime * 1000}
                      </Moment>
                      {` left`}
                    </>
                  ) : (
                    'Expired'
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <VerticalAlign>
                    <img src='/images/icons/calendar.png' alt='' /> Last Web Login
                  </VerticalAlign>
                </td>
                <td>
                  {loading ? (
                    <ReactLoader size={17} />
                  ) : info?.logs?.length ? (
                    <Moment fromNow withTitle>
                      {info.logs[0].date}
                    </Moment>
                  ) : (
                    'n/a'
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <VerticalAlign>
                    <img src='/images/icons/ip.png' alt='' /> Last Web Login IP
                  </VerticalAlign>
                </td>
                <td>
                  {loading ? (
                    <ReactLoader size={17} />
                  ) : info?.logs?.length ? (
                    <a href={`https://whatismyipaddress.com/ip/${info.logs[0].ip}`} target='_blank' rel='noreferrer'>
                      {info.logs[0].ip}
                    </a>
                  ) : (
                    'n/a'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrapper>
      </MainContentBlock>

      <MainContentBlock padding={0}>
        <UserSubMenu>
          <SubLink to='/account/password'>Change Password</SubLink>
          <SubLink to='/account/logs'>Account Logs</SubLink>
        </UserSubMenu>
      </MainContentBlock>

      <Switch>
        <PrivateRoute path='/account/password' component={ChangePassword} />
        <PrivateRoute path='/account' component={Logs} />
      </Switch>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const UserSubMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px 0;
`

const SubLink = styled(Link)`
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.1);
`

const TableWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  table {
    width: 50%;
    margin: 15px;

    &:first-of-type {
      margin-right: 8px;
    }

    &:last-of-type {
      margin-left: 8px;
    }

    td:first-of-type {
      text-align: left;
    }

    td:last-of-type {
      text-align: right;
    }
  }
`

const VerticalAlign = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 8px;
  }
`
