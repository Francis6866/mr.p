import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { recordsService } from '../../services/recordsService.js'

// Async thunks using the separated records service
export const fetchRecordsByBusiness = createAsyncThunk(
  'records/fetchRecordsByBusiness',
  async (data, { rejectWithValue }) => {
    try {
      const response = await recordsService.getRecords()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchRecords = createAsyncThunk(
  'records/fetchRecords',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await recordsService.getRecords(params)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchRecordById = createAsyncThunk(
  'records/fetchRecordById',
  async ({ recordId }, { rejectWithValue }) => {
    try {
      const response = await recordsService.getRecordById(recordId)
      console.log("Response", response)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addRecord = createAsyncThunk(
  'records/addRecord',
  async (recordData, { rejectWithValue }) => {
    try {
      return await recordsService.createRecord(recordData)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateRecord = createAsyncThunk(
  'records/updateRecord',
  async ({ id, recordData }, { rejectWithValue }) => {
    try {
      return await recordsService.updateRecord(id, recordData)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteRecord = createAsyncThunk(
  'records/deleteRecord',
  async (recordId, { rejectWithValue }) => {
    try {
      return await recordsService.deleteRecord(recordId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchRecords = createAsyncThunk(
  'records/searchRecords',
  async ({ searchTerm, filters = {} }, { rejectWithValue }) => {
    try {
      return await recordsService.searchRecords(searchTerm, filters)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getRecordsByDateRange = createAsyncThunk(
  'records/getRecordsByDateRange',
  async ({ startDate, endDate, params = {} }, { rejectWithValue }) => {
    try {
      return await recordsService.getRecordsByDateRange(startDate, endDate, params)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const bulkDeleteRecords = createAsyncThunk(
  'records/bulkDeleteRecords',
  async (recordIds, { rejectWithValue }) => {
    try {
      return await recordsService.bulkDeleteRecords(recordIds)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  records: [],
  selectedRecord: null,
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    dateFrom: null,
    dateTo: null,
    recordType: 'all',
    patientId: null,
  },
  pagination: {
    page: 1,
    pageSize: 20,
    total: 0,
  },
}

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    clearSelectedRecord: (state) => {
      state.selectedRecord = null
    },
    clearError: (state) => {
      state.error = null
    },
    clearRecords: (state) => {
      state.records = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch records cases
      .addCase(fetchRecords.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.loading = false
        state.records = action.payload?.data || action.payload
        state.pagination.total = action.payload?.total || action.payload?.length
        state.error = null
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch record by ID cases
      .addCase(fetchRecordById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecordById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedRecord = action.payload
        state.error = null
      })
      .addCase(fetchRecordById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Add record cases
      .addCase(addRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addRecord.fulfilled, (state, action) => {
        state.loading = false
        // state.records.unshift(action.payload)
        state.error = null
      })
      .addCase(addRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update record cases
      .addCase(updateRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.loading = false
        const index = state.records.findIndex(r => r.id === action.payload.id)
        if (index !== -1) {
          state.records[index] = action.payload
        }
        if (state.selectedRecord?.id === action.payload.id) {
          state.selectedRecord = action.payload
        }
        state.error = null
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Delete record cases
      .addCase(deleteRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.loading = false
        state.records = state.records.filter(r => r.id !== action.payload)
        if (state.selectedRecord?.id === action.payload) {
          state.selectedRecord = null
        }
        state.error = null
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {
  setSearchTerm,
  setFilters,
  setPagination,
  clearSelectedRecord,
  clearError,
  clearRecords
} = recordsSlice.actions

export default recordsSlice.reducer 