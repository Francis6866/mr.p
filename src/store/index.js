import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import patientSlice from './slices/patientSlice'
import recordsSlice from './slices/recordsSlice'
import appointmentSlice from './slices/appointmentSlice'
import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    patients: patientSlice,
    records: recordsSlice,
    appointments: appointmentSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

// Export types for TypeScript support if needed
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch 