import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// use throught the app instead of plain `useDispatch` and `useSelector`

const useAppDispatch = () => useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>()

export { useAppDispatch, useAppSelector }
