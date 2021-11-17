import { ToastContentProps } from 'react-toastify'
import { AxiosError } from 'axios'

export * from './character'
export * from './user'
export * from './guild'
export * from './chat'

export type ToastError = ToastContentProps<AxiosError<{ error: string }>>
