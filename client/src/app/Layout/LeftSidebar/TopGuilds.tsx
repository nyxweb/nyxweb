import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'store'

import { GuildMark, ReactLoader, SideContentBlock } from 'app/components'
import { getGuildsTop5 } from 'store/ranking'

export const TopGuilds = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { data, loading } = useAppSelector((state) => state.ranking.guilds_top5)

  useEffect(() => {
    dispatch(getGuildsTop5())
  }, [dispatch])

  const linkToGuildPage = (name: string) => {
    history.push(`/guild/${name}`)
  }

  return (
    <SideContentBlock title='top guilds' desc='most powerful guilds'>
      <Wrapper>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: 'left' }}>name</th>
              <th>levels</th>
              <th>membs</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>
                  <ReactLoader />
                </td>
              </tr>
            ) : !data?.length ? (
              <tr>
                <td colSpan={5}>no guilds found...</td>
              </tr>
            ) : (
              data.map((guild, index) => (
                <tr key={guild.G_Name + index} onClick={() => linkToGuildPage(guild.G_Name)}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: 'left' }}>{guild.G_Name}</td>
                  <td>{guild.levels.toLocaleString()}</td>
                  <td>{guild.members}</td>
                  <td style={{ padding: 0 }}>
                    <GuildMark markHex={guild.G_Mark} size={30} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Wrapper>
    </SideContentBlock>
  )
}

const Wrapper = styled.div`
  margin: 0 -10px;

  table tbody tr,
  table tbody td {
    cursor: url('/images/main/pointer.cur'), pointer;
  }
`
