# Redux and Redux Toolkit Setup Guide

This document explains how to use Redux and Redux Toolkit in your healthcare management application.

## 📁 File Structure

```
src/
├── store/
│   ├── index.js          # Main store configuration
│   ├── hooks.js          # Custom Redux hooks
│   ├── utils.js          # Utility functions
│   └── slices/
│       ├── authSlice.js      # Authentication state
│       ├── patientSlice.js   # Patient management
│       ├── recordsSlice.js   # Medical records
│       └── uiSlice.js        # UI state (modals, notifications, etc.)
```

## 🎯 Available Slices

### 1. Authentication Slice (`authSlice.js`)
Manages user authentication and authorization.

**State:**
- `user`: Current user information
- `token`: Authentication token
- `isAuthenticated`: Boolean authentication status
- `loading`: Loading state for auth operations
- `error`: Error messages

**Actions:**
- `loginUser(credentials)`: Login with email/password
- `registerUser(userData)`: Register new user
- `logout()`: Clear user session
- `setUser(userData)`: Set user data
- `clearError()`: Clear error messages

### 2. Patient Slice (`patientSlice.js`)
Manages patient data and operations.

**State:**
- `patients`: Array of patient records
- `selectedPatient`: Currently selected patient
- `loading`: Loading state
- `error`: Error messages
- `searchTerm`: Search query
- `filters`: Filter options

**Actions:**
- `fetchPatients()`: Get all patients
- `fetchPatientById(id)`: Get specific patient
- `addPatient(data)`: Add new patient
- `updatePatient({id, data})`: Update patient
- `deletePatient(id)`: Remove patient
- `setSearchTerm(term)`: Set search query
- `setFilters(filters)`: Set filter options
- `clearSelectedPatient()`: Clear selection

### 3. Records Slice (`recordsSlice.js`)
Manages medical records and history.

**State:**
- `records`: Array of medical records
- `selectedRecord`: Currently selected record
- `loading`: Loading state
- `error`: Error messages
- `searchTerm`: Search query
- `filters`: Filter options
- `pagination`: Pagination settings

**Actions:**
- `fetchRecords(patientId?)`: Get records (all or by patient)
- `fetchRecordById(id)`: Get specific record
- `addRecord(data)`: Add new record
- `updateRecord({id, data})`: Update record
- `deleteRecord(id)`: Remove record
- `setSearchTerm(term)`: Set search query
- `setFilters(filters)`: Set filter options
- `setPagination(config)`: Set pagination

### 4. UI Slice (`uiSlice.js`)
Manages UI state and interactions.

**State:**
- `sidebarOpen`: Sidebar visibility
- `modals`: Modal states
- `notifications`: Notification queue
- `theme`: Current theme
- `loading`: Various loading states
- `selectedItems`: Selected items for bulk operations

**Actions:**
- `toggleSidebar()`: Toggle sidebar
- `openModal({modalName, data})`: Open modal
- `closeModal(modalName)`: Close modal
- `addNotification(notification)`: Add notification
- `removeNotification(id)`: Remove notification
- `setTheme(theme)`: Set theme
- `toggleTheme()`: Toggle between themes

## 🔧 How to Use Redux in Components

### 1. Import Required Hooks and Actions

```jsx
import { useAppDispatch, useAuth, usePatients } from '../store/hooks'
import { loginUser, logout } from '../store/slices/authSlice'
import { fetchPatients, addPatient } from '../store/slices/patientSlice'
import { addNotification } from '../store/slices/uiSlice'
```

### 2. Use Redux State and Actions

```jsx
const MyComponent = () => {
  const dispatch = useAppDispatch()
  const auth = useAuth()
  const patients = usePatients()

  // Fetch data on component mount
  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(fetchPatients())
    }
  }, [auth.isAuthenticated, dispatch])

  // Handle user action
  const handleAddPatient = async (patientData) => {
    try {
      await dispatch(addPatient(patientData)).unwrap()
      dispatch(addNotification({
        type: 'success',
        message: 'Patient added successfully!'
      }))
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.message
      }))
    }
  }

  return (
    <div>
      {/* Your component JSX */}
    </div>
  )
}
```

### 3. Handle Loading States

```jsx
const PatientList = () => {
  const { patients, loading, error } = usePatients()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {patients.map(patient => (
        <div key={patient.id}>{patient.name}</div>
      ))}
    </div>
  )
}
```

## 🛠 Utility Functions

The `utils.js` file provides helpful functions:

```jsx
import { 
  createSuccessNotification, 
  createErrorNotification,
  extractErrorMessage 
} from '../store/utils'

// Create notifications easily
dispatch(addNotification(createSuccessNotification('Success!')))
dispatch(addNotification(createErrorNotification('Error occurred')))

// Extract error messages from various formats
const errorMsg = extractErrorMessage(error)
```

## 🔄 Async Operations

All async operations use Redux Toolkit's `createAsyncThunk`:

```jsx
// The thunk handles loading states automatically
const handleLogin = async (credentials) => {
  try {
    // .unwrap() throws an error if the action is rejected
    const result = await dispatch(loginUser(credentials)).unwrap()
    // Handle success
  } catch (error) {
    // Handle error
  }
}
```

## 📱 Integration with Existing Components

To integrate Redux with your existing components:

1. **Replace local state** with Redux state where appropriate
2. **Use Redux actions** instead of direct API calls
3. **Handle loading/error states** through Redux
4. **Use notifications** for user feedback

### Example: Updating LoginForm Component

```jsx
// Before (local state)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

// After (Redux)
const { loading, error } = useAuth()
const dispatch = useAppDispatch()

const handleSubmit = async (formData) => {
  try {
    await dispatch(loginUser(formData)).unwrap()
    // Redirect or show success
  } catch (err) {
    // Error is automatically handled by Redux
  }
}
```

## 🎨 UI State Management

Use the UI slice for managing:

- Modal visibility
- Notifications/toasts
- Theme switching
- Sidebar state
- Loading indicators

```jsx
const { modals, notifications, theme } = useUI()

// Open a modal
dispatch(openModal({ modalName: 'addPatient', data: patientData }))

// Add a notification
dispatch(addNotification({
  type: 'success',
  message: 'Operation completed',
  title: 'Success'
}))
```

## 🔐 API Integration

Update your API endpoints in the slice files:

1. Replace placeholder URLs with your actual API endpoints
2. Update request/response handling as needed
3. Add proper error handling
4. Include authentication headers

## 📦 Next Steps

1. **Update your existing components** to use Redux state
2. **Replace local API calls** with Redux actions
3. **Implement proper error handling** using notifications
4. **Add loading states** to improve UX
5. **Configure your API endpoints** in the slice files

## 🎯 Best Practices

- Use the custom hooks (`useAuth`, `usePatients`, etc.) instead of raw `useSelector`
- Handle errors consistently using the notification system
- Keep API logic in the slices, not in components
- Use TypeScript types when available
- Implement proper loading states for better UX

## 🐛 Troubleshooting

- Ensure the Redux Provider is wrapped around your app in `main.jsx`
- Check that you're importing from the correct slice files
- Verify API endpoints match your backend
- Use Redux DevTools for debugging state changes 