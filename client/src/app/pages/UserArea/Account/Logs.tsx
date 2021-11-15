import { useMemo, useState } from 'react'
import Moment from 'react-moment'
import MomentJS from 'moment'
import ReactTooltip from 'react-tooltip'
import { v4 as uuid } from 'uuid'

import { MainContentBlock, ReactLoader } from 'app/components'
import styled from 'styled-components'
import { useRequest } from 'hooks'

export interface IAccountLog {
  type: string
  log_message: string
  date: Date
  ip: string
}

interface LogFilters {
  search: string
  type: string | null
  ip: string | null
  limit: number | null
}

export const Logs = () => {
  const [filters, setFilters] = useState<LogFilters>({ search: '', type: null, ip: null, limit: 20 })
  const [logs, loading] = useRequest<IAccountLog[]>('/users/account/logs')

  const applyFilters = (logs: IAccountLog[]) => {
    return logs
      .filter(
        (log) =>
          (filters.search.length ? new RegExp(filters.search, 'i').test(log.log_message) : true) &&
          (filters.type ? log.type === filters.type : true) &&
          (filters.ip ? log.ip === filters.ip : true),
      )
      .slice(0, filters.limit || 1000)
  }

  const filterValues = useMemo(() => {
    if (!logs) return null

    return {
      types: Array.from(new Set(logs.map((log) => log.type))),
      ips: Array.from(new Set(logs.map((log) => log.ip))),
    }
  }, [logs])

  return (
    <MainContentBlock>
      <Filters>
        <input placeholder='Search log message' onChange={(e) => setFilters((filters) => ({ ...filters, search: e.target.value }))} />
        <SelectForm>
          <select onChange={(e) => setFilters((filters) => ({ ...filters, type: e.target.value.length ? e.target.value : null }))}>
            <option value=''>any type</option>
            {filterValues?.types.map((type, index) => (
              <option value={type} key={type + index}>
                {type}
              </option>
            ))}
          </select>
        </SelectForm>
        <SelectForm>
          <select onChange={(e) => setFilters((filters) => ({ ...filters, ip: e.target.value.length ? e.target.value : null }))}>
            <option value=''>any ip</option>
            {filterValues?.ips.map((ip, index) => (
              <option value={ip} key={ip + index}>
                {ip}
              </option>
            ))}
          </select>
        </SelectForm>
        <SelectForm>
          <select onChange={(e) => setFilters((filters) => ({ ...filters, limit: Number(e.target.value) || null }))} defaultValue={20}>
            <option value={0}>{'all logs'}</option>
            <option value={20}>{20}</option>
            <option value={50}>{50}</option>
            <option value={100}>{100}</option>
          </select>
        </SelectForm>
      </Filters>

      <table>
        <thead>
          <tr>
            <th>when</th>
            <th>action</th>
            <th>ip</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3}>
                <ReactLoader />
              </td>
            </tr>
          ) : !logs ? (
            <tr>
              <td colSpan={3}>Could not load account logs</td>
            </tr>
          ) : (
            applyFilters(logs).map((log) => {
              const id = uuid()

              return (
                <tr data-tip={MomentJS(log.date).format('YYYY-MM-DD HH:mm:ss')} data-for={id} key={id}>
                  <td>
                    <Moment fromNow>{log.date}</Moment>
                    <ReactTooltip id={id} place='top' type='info' effect='solid' />
                  </td>
                  <td style={{ textAlign: 'left' }}>{log.log_message}</td>
                  <td>
                    <a href={`https://whatismyipaddress.com/ip/${log.ip}`} target='_blank' rel='noreferrer'>
                      {log.ip}
                    </a>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </MainContentBlock>
  )
}

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`

const SelectForm = styled.div`
  display: flex;
  align-items: center;

  select {
    margin-left: 5px;
  }
`
