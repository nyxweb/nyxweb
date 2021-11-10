import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface Config {
  method: 'get' | 'post' | 'delete' | 'put' | 'patch'
}

export const useRequest = <T>(
  path: string,
  method: Config['method'] = 'get',
  config?: AxiosRequestConfig,
): [T | undefined, boolean] => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>()

  useEffect(() => {
    axios[method](path, config)
      .then(({ data }) => {
        setData(data)
      })
      .catch((error) => {
        toast.error(error.response?.data.error || error.response?.data.message || error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [path, method, config])

  return [data, loading]
}
