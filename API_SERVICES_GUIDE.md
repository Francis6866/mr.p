# API Services Architecture Guide

This document explains the separated API services architecture that has been implemented to improve code organization, reusability, and testability.

## 📁 Services Structure

```
src/
├── services/
│   ├── index.js              # Central export file
│   ├── api.js                # Base API service class
│   ├── authService.js        # Authentication operations
│   ├── patientService.js     # Patient management operations
│   └── recordsService.js     # Medical records operations
└── store/
    └── slices/
        ├── authSlice.js      # Auth Redux slice (now uses authService)
        ├── patientSlice.js   # Patient Redux slice (now uses patientService)
        └── recordsSlice.js   # Records Redux slice (now uses recordsService)
```

## 🎯 Architecture Benefits

### ✅ Separation of Concerns
- **Services**: Handle API communication and business logic
- **Redux Slices**: Manage state and UI-related logic
- **Components**: Focus on presentation and user interaction

### ✅ Reusability
- Services can be used outside of Redux (in components, utilities, etc.)
- Easy to share API logic between different parts of the application
- Consistent API patterns across all services

### ✅ Testability
- Services can be unit tested independently
- Mock services easily for component testing
- Clear interface between data layer and state management

### ✅ Maintainability
- Single source of truth for API endpoints
- Centralized error handling and response processing
- Easy to update API logic without touching Redux code

## 🔧 Base API Service

The `ApiService` class provides common functionality for all HTTP operations:

```javascript
import { apiService } from '../services/api.js'

// Basic usage
const data = await apiService.get('/endpoint')
const result = await apiService.post('/endpoint', data)
const updated = await apiService.put('/endpoint/123', updateData)
await apiService.delete('/endpoint/123')
```

### Features:
- **Automatic Authentication**: Includes Bearer token in headers
- **Error Handling**: Standardized error response processing
- **Flexible Headers**: Support for custom headers
- **Response Processing**: Automatic JSON parsing

## 🔐 Authentication Service

### Available Methods:

```javascript
import { authService } from '../services/authService.js'

// Authentication
await authService.login({ email, password })
await authService.register(userData)
await authService.logout()

// Profile management
const user = await authService.getCurrentUser()
await authService.updateProfile(userData)
await authService.changePassword(passwordData)

// Password reset
await authService.requestPasswordReset(email)
await authService.resetPassword(token, newPassword)

// Utility methods
const isAuth = authService.isAuthenticated()
const token = authService.getToken()
```

### Token Management:
- Automatic token storage in localStorage
- Token validation with expiration checking
- Automatic token cleanup on logout

## 👥 Patient Service

### Core Operations:

```javascript
import { patientService } from '../services/patientService.js'

// CRUD operations
const patients = await patientService.getPatients()
const patient = await patientService.getPatientById(id)
const newPatient = await patientService.createPatient(data)
const updated = await patientService.updatePatient(id, data)
await patientService.deletePatient(id)

// Advanced operations
const results = await patientService.searchPatients('John Doe', filters)
const stats = await patientService.getPatientStats()
const appointments = await patientService.getPatientAppointments(id)
```

### Extended Features:
- Patient medical history management
- Document upload and management
- Insurance information handling
- Emergency contacts management
- Bulk operations support
- Archive/restore functionality

## 📋 Records Service

### Core Operations:

```javascript
import { recordsService } from '../services/recordsService.js'

// Basic CRUD
const records = await recordsService.getRecords()
const patientRecords = await recordsService.getRecordsByPatient(patientId)
const record = await recordsService.getRecordById(id)
const newRecord = await recordsService.createRecord(data)
await recordsService.updateRecord(id, data)

// Specialized operations
const labResults = await recordsService.getLabResults(patientId)
const prescriptions = await recordsService.getPrescriptions(patientId)
const vitalSigns = await recordsService.getVitalSigns(patientId)
```

### Advanced Features:
- Record templates and form generation
- Attachment handling
- Date range filtering
- Record type categorization
- Export functionality
- Statistical analysis

## 🔄 Integration with Redux

### Updated Redux Slices

The Redux slices now use the separated services:

```javascript
// Before: Inline API calls
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', { /* ... */ })
      // ... handling logic
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// After: Using service
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
```

### Enhanced Thunks

New thunks have been added to leverage service capabilities:

```javascript
// Patient slice enhancements
export const searchPatients = createAsyncThunk(
  'patients/searchPatients',
  async ({ searchTerm, filters }, { rejectWithValue }) => {
    try {
      return await patientService.searchPatients(searchTerm, filters)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Records slice enhancements
export const getRecordsByDateRange = createAsyncThunk(
  'records/getRecordsByDateRange',
  async ({ startDate, endDate, params }, { rejectWithValue }) => {
    try {
      return await recordsService.getRecordsByDateRange(startDate, endDate, params)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
```

## 🚀 Usage Patterns

### 1. Redux + Services (Recommended)

For most application features, use Redux for state management:

```javascript
const MyComponent = () => {
  const dispatch = useAppDispatch()
  const { patients, loading } = usePatients()

  const handleAddPatient = async (data) => {
    try {
      await dispatch(addPatient(data)).unwrap()
      // Handle success
    } catch (error) {
      // Handle error
    }
  }
}
```

### 2. Direct Service Usage

For simple operations or utilities that don't need state management:

```javascript
import { patientService } from '../services'

const ExportComponent = () => {
  const handleExport = async () => {
    try {
      const data = await patientService.exportPatients('csv')
      // Handle export
    } catch (error) {
      // Handle error
    }
  }
}
```

### 3. Combined Approach

Use services for complex operations and Redux for state updates:

```javascript
const PatientDetail = ({ patientId }) => {
  const dispatch = useAppDispatch()
  const [documents, setDocuments] = useState([])

  const handleDocumentUpload = async (file) => {
    try {
      // Use service directly for file upload
      const newDoc = await patientService.uploadPatientDocument(patientId, file)
      setDocuments(prev => [...prev, newDoc])
      
      // Update Redux state if needed
      dispatch(addNotification(createSuccessNotification('Document uploaded')))
    } catch (error) {
      dispatch(addNotification(createErrorNotification(error.message)))
    }
  }
}
```

## 🔧 Configuration

### API Base URL

Update the base URL in `src/services/api.js`:

```javascript
class ApiService {
  constructor(baseURL = '/api') { // Change this to your API base URL
    this.baseURL = baseURL
  }
}
```

### Environment-specific Configuration

```javascript
// For different environments
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://api.yourapp.com/v1'
  : '/api'

export const apiService = new ApiService(baseURL)
```

## 🛠 Extending Services

### Adding New Endpoints

```javascript
// In patientService.js
class PatientService {
  // Add new method
  async getPatientAnalytics(patientId, timeRange) {
    return await apiService.get(`/patients/${patientId}/analytics?range=${timeRange}`)
  }
}
```

### Adding New Services

1. Create the service file:

```javascript
// src/services/appointmentService.js
import { apiService } from './api.js'

class AppointmentService {
  async getAppointments(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString ? `/appointments?${queryString}` : '/appointments'
    return await apiService.get(endpoint)
  }
}

export const appointmentService = new AppointmentService()
export default AppointmentService
```

2. Add to index.js:

```javascript
// src/services/index.js
export { appointmentService } from './appointmentService.js'
```

3. Create Redux slice if needed:

```javascript
// src/store/slices/appointmentSlice.js
import { appointmentService } from '../../services/appointmentService.js'
```

## 🧪 Testing Services

### Unit Testing Services

```javascript
// __tests__/services/patientService.test.js
import { patientService } from '../src/services/patientService'

// Mock the API service
jest.mock('../src/services/api', () => ({
  apiService: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
}))

describe('PatientService', () => {
  it('should fetch patients', async () => {
    const mockPatients = [{ id: 1, name: 'John Doe' }]
    apiService.get.mockResolvedValue(mockPatients)

    const result = await patientService.getPatients()
    
    expect(apiService.get).toHaveBeenCalledWith('/patients')
    expect(result).toEqual(mockPatients)
  })
})
```

### Integration Testing

```javascript
// __tests__/integration/patient.test.js
describe('Patient Integration', () => {
  it('should create patient through Redux', async () => {
    const store = createTestStore()
    const patientData = { name: 'Jane Doe', email: 'jane@example.com' }

    await store.dispatch(addPatient(patientData))

    const state = store.getState()
    expect(state.patients.patients).toContainEqual(
      expect.objectContaining(patientData)
    )
  })
})
```

## 📚 Best Practices

### 1. Error Handling
- Use consistent error formats across all services
- Handle network errors gracefully
- Provide meaningful error messages

### 2. Loading States
- Use Redux loading states for UI feedback
- Consider implementing request cancellation for long operations

### 3. Caching
- Implement caching strategies for frequently accessed data
- Consider using Redux RTK Query for advanced caching needs

### 4. Security
- Never store sensitive data in services
- Validate data before sending to API
- Use HTTPS in production

### 5. Performance
- Implement pagination for large datasets
- Use appropriate HTTP methods
- Consider request debouncing for search operations

## 🔄 Migration Guide

### From Inline API Calls

1. **Identify API calls** in components and slices
2. **Move to appropriate service** based on domain
3. **Update imports** to use services
4. **Test functionality** to ensure compatibility
5. **Remove duplicate code** and consolidate logic

### Example Migration:

```javascript
// Before
const handleLogin = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  const data = await response.json()
  localStorage.setItem('token', data.token)
}

// After
const handleLogin = async (credentials) => {
  await authService.login(credentials)
  // Token storage is handled automatically
}
```

This architecture provides a solid foundation for scaling your application while maintaining clean, testable, and maintainable code! 