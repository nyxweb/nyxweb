import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from './index'

export const useAppDispatch = () => useDispatch()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
