// Utility functions for Redux operations

// Helper function to create notification actions
export const createNotification = (type, message, title = null) => ({
  type,
  message,
  title,
  timestamp: new Date().toISOString(),
})

// Success notification helper
export const createSuccessNotification = (message, title = 'Success') =>
  createNotification('success', message, title)

// Error notification helper
export const createErrorNotification = (message, title = 'Error') =>
  createNotification('error', message, title)

// Info notification helper
export const createInfoNotification = (message, title = 'Info') =>
  createNotification('info', message, title)

// Warning notification helper
export const createWarningNotification = (message, title = 'Warning') =>
  createNotification('warning', message, title)

// Helper to extract error message from various error formats
export const extractErrorMessage = (error) => {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.data?.message) return error.data.message
  if (error?.error) return error.error
  return 'An unexpected error occurred'
}

// Helper to create standardized API headers
export const createAPIHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  
  if (includeAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }
  
  return headers
}

// Helper to handle common async thunk patterns
export const createAsyncThunkHandler = (apiCall) => {
  return async (payload, { rejectWithValue }) => {
    try {
      const response = await apiCall(payload)
      return response
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  }
}

// Local storage helpers for state persistence
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }
}

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn('Failed to load from localStorage:', error)
    return defaultValue
  }
}

// Helper to debounce actions (useful for search)
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
} 