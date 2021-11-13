import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface Config {
  method: 'get' | 'post' | 'delete' | 'put' | 'patch'
  toastErrors?: boolean
}

export const useRequest = <T>(
  path: string,
  { method, toastErrors, ...config }: AxiosRequestConfig & Config = { method: 'get' },
): [T | undefined, boolean] => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>()

  useEffect(() => {
    axios[method](path, config)
      .then(({ data }) => {
        setData(data)
      })
      .catch((error) => {
        if (toastErrors) toast.error(error.response?.data.error || error.response?.data.message || error.message)
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line
  }, [])

  return [data, loading]
}
