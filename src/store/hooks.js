import { useDispatch, useSelector } from 'react-redux'

// Custom hooks for better type safety and convenience
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

// Convenience hooks for specific slices
export const useAuth = () => useAppSelector(state => state.auth)
export const usePatients = () => useAppSelector(state => state.patients)
export const useRecords = () => useAppSelector(state => state.records)
export const useUI = () => useAppSelector(state => state.ui) 