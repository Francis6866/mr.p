import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { patientService } from '../../services/patientService.js'

// Async thunks using the separated patient service
export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (params = {}, { rejectWithValue }) => {
    try {
      return await patientService.getPatients(params)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchPatientById = createAsyncThunk(
  'patients/fetchPatientById',
  async (patientId, { rejectWithValue }) => {
    try {
      return await patientService.getPatientById(patientId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addPatient = createAsyncThunk(
  'patients/addPatient',
  async (patientData, { rejectWithValue }) => {
    try {
      return await patientService.createPatient(patientData)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async ({ id, patientData }, { rejectWithValue }) => {
    try {
      return await patientService.updatePatient(id, patientData)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (patientId, { rejectWithValue }) => {
    try {
      return await patientService.deletePatient(patientId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchPatients = createAsyncThunk(
  'patients/searchPatients',
  async ({ searchTerm, filters = {} }, { rejectWithValue }) => {
    try {
      return await patientService.searchPatients(searchTerm, filters)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const bulkDeletePatients = createAsyncThunk(
  'patients/bulkDeletePatients',
  async (patientIds, { rejectWithValue }) => {
    try {
      return await patientService.bulkDeletePatients(patientIds)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// request consent token
export const requestConsentToken = createAsyncThunk(
  'patients/requestConsentToken',
  async (patientId, { rejectWithValue }) => {
    try {
      return await patientService.requestConsentToken(patientId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    status: 'all',
    dateRange: null,
  },
}

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearSelectedPatient: (state) => {
      state.selectedPatient = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch patients cases
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false
        state.patients = action.payload.data
        state.error = null
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch patient by ID cases
      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedPatient = action.payload.data
        state.error = null
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Add patient cases
      .addCase(addPatient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.loading = false
        state.patients.push(action.payload)
        state.error = null
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update patient cases
      .addCase(updatePatient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false
        const index = state.patients.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.patients[index] = action.payload
        }
        if (state.selectedPatient?.id === action.payload.id) {
          state.selectedPatient = action.payload
        }
        state.error = null
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Delete patient cases
      .addCase(deletePatient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false
        state.patients = state.patients.filter(p => p.id !== action.payload)
        if (state.selectedPatient?.id === action.payload) {
          state.selectedPatient = null
        }
        state.error = null
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setSearchTerm, setFilters, clearSelectedPatient, clearError } = patientSlice.actions
export default patientSlice.reducer 