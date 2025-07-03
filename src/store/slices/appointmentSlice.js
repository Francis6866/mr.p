import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { appointmentService } from '../../services/appointmentService.js'

// Async thunks using the appointment service
export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAppointments',
    async (params = {}, { rejectWithValue }) => {
        try {
            return await appointmentService.getAppointments(params)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchAppointmentByPatientBusiness = createAsyncThunk(
    'appointments/fetchAppointmentByPatientBusiness',
    async (patientId, { rejectWithValue }) => {
        try {
            return await appointmentService.getAppointmentsByPatientBusiness(patientId)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchAppointmentById = createAsyncThunk(
    'appointments/fetchAppointmentById',
    async (appointmentId, { rejectWithValue }) => {
        try {
            return await appointmentService.getAppointmentById(appointmentId)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchAppointmentsByPatient = createAsyncThunk(
    'appointments/fetchAppointmentsByPatient',
    async ({ patientId, params = {} }, { rejectWithValue }) => {
        try {
            return await appointmentService.getAppointmentsByPatient(patientId, params)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchAppointmentsByDoctor = createAsyncThunk(
    'appointments/fetchAppointmentsByDoctor',
    async ({ doctorId, params = {} }, { rejectWithValue }) => {
        try {
            return await appointmentService.getAppointmentsByDoctor(doctorId, params)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const createAppointment = createAsyncThunk(
    'appointments/createAppointment',
    async (appointmentData, { rejectWithValue }) => {
        try {
            return await appointmentService.createAppointment(appointmentData)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateAppointment = createAsyncThunk(
    'appointments/updateAppointment',
    async ({ id, appointmentData }, { rejectWithValue }) => {
        try {
            return await appointmentService.updateAppointment(id, appointmentData)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const cancelAppointment = createAsyncThunk(
    'appointments/cancelAppointment',
    async ({ appointmentId, reason }, { rejectWithValue }) => {
        try {
            return await appointmentService.cancelAppointment(appointmentId, reason)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const rescheduleAppointment = createAsyncThunk(
    'appointments/rescheduleAppointment',
    async ({ appointmentId, updateData }, { rejectWithValue }) => {
        try {
            const response = await appointmentService.rescheduleAppointment(appointmentId, updateData)
            if (response.success) {
                return response.data
            } else {
                return rejectWithValue(response.message)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const confirmAppointment = createAsyncThunk(
    'appointments/confirmAppointment',
    async (appointmentId, { rejectWithValue }) => {
        try {
            return await appointmentService.confirmAppointment(appointmentId)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const completeAppointment = createAsyncThunk(
    'appointments/completeAppointment',
    async ({ appointmentId, completionData }, { rejectWithValue }) => {
        try {
            return await appointmentService.completeAppointment(appointmentId, completionData)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const markNoShow = createAsyncThunk(
    'appointments/markNoShow',
    async (appointmentId, { rejectWithValue }) => {
        try {
            return await appointmentService.markNoShow(appointmentId)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteAppointment = createAsyncThunk(
    'appointments/deleteAppointment',
    async (appointmentId, { rejectWithValue }) => {
        try {
            return await appointmentService.deleteAppointment(appointmentId)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchAvailableSlots = createAsyncThunk(
    'appointments/fetchAvailableSlots',
    async ({ doctorId, date }, { rejectWithValue }) => {
        try {
            return await appointmentService.getAvailableSlots(doctorId, date)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchTodaysAppointments = createAsyncThunk(
    'appointments/fetchTodaysAppointments',
    async (params = {}, { rejectWithValue }) => {
        try {
            return await appointmentService.getTodaysAppointments(params)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchUpcomingAppointments = createAsyncThunk(
    'appointments/fetchUpcomingAppointments',
    async ({ days = 7, params = {} }, { rejectWithValue }) => {
        try {
            return await appointmentService.getUpcomingAppointments(days, params)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const searchAppointments = createAsyncThunk(
    'appointments/searchAppointments',
    async ({ searchTerm, filters = {} }, { rejectWithValue }) => {
        try {
            return await appointmentService.searchAppointments(searchTerm, filters)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchAppointmentStats = createAsyncThunk(
    'appointments/fetchAppointmentStats',
    async (params = {}, { rejectWithValue }) => {
        try {
            return await appointmentService.getAppointmentStats(params)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const sendAppointmentReminder = createAsyncThunk(
    'appointments/sendReminder',
    async ({ appointmentId, method }, { rejectWithValue }) => {
        try {
            return await appointmentService.sendReminder(appointmentId, method)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const checkAppointmentConflicts = createAsyncThunk(
    'appointments/checkConflicts',
    async ({ doctorId, date, time, duration }, { rejectWithValue }) => {
        try {
            return await appointmentService.checkConflicts(doctorId, date, time, duration)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    appointments: [],
    todaysAppointments: [],
    upcomingAppointments: [],
    selectedAppointment: null,
    availableSlots: [],
    appointmentStats: null,
    conflicts: null,
    loading: false,
    error: null,
    searchTerm: '',
    filters: {
        status: 'all',
        dateRange: null,
        doctorId: null,
        patientId: null,
    },
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
}

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearSelectedAppointment: (state) => {
            state.selectedAppointment = null
        },
        clearError: (state) => {
            state.error = null
        },
        clearConflicts: (state) => {
            state.conflicts = null
        },
        clearAvailableSlots: (state) => {
            state.availableSlots = []
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch appointments cases
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.loading = false
                state.appointments = action.payload.data
                if (action.payload.pagination) {
                    state.pagination = action.payload.pagination
                }
                state.error = null
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Fetch appointments by business cases
            .addCase(fetchAppointmentByPatientBusiness.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAppointmentByPatientBusiness.fulfilled, (state, action) => {
                state.loading = false
                state.appointments = action.payload.data
                if (action.payload.pagination) {
                    state.pagination = action.payload.pagination
                }
                state.error = null
            })
            .addCase(fetchAppointmentByPatientBusiness.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Fetch appointment by ID cases
            .addCase(fetchAppointmentById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAppointmentById.fulfilled, (state, action) => {
                state.loading = false
                state.selectedAppointment = action.payload.data
                state.error = null
            })
            .addCase(fetchAppointmentById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Create appointment cases
            .addCase(createAppointment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.loading = false
                state.appointments.unshift(action.payload.data)
                state.error = null
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Update appointment cases
            .addCase(updateAppointment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                state.loading = false
                const index = state.appointments.findIndex(a => a.id === action.payload.data.id)
                if (index !== -1) {
                    state.appointments[index] = action.payload.data
                }
                if (state.selectedAppointment?.id === action.payload.data.id) {
                    state.selectedAppointment = action.payload.data
                }
                state.error = null
            })
            .addCase(updateAppointment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Cancel appointment cases
            .addCase(cancelAppointment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(cancelAppointment.fulfilled, (state, action) => {
                state.loading = false
                const index = state.appointments.findIndex(a => a.id === action.payload.data.id)
                if (index !== -1) {
                    state.appointments[index] = action.payload.data
                }
                if (state.selectedAppointment?.id === action.payload.data.id) {
                    state.selectedAppointment = action.payload.data
                }
                state.error = null
            })
            .addCase(cancelAppointment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Reschedule appointment cases
            .addCase(rescheduleAppointment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(rescheduleAppointment.fulfilled, (state, action) => {
                state.loading = false
                // console.log("Reschedule Appointment Response", action.payload)
                const index = state.appointments.findIndex(a => a.appointmentId === action.payload[0].appointmentId)
                if (index !== -1) {
                    state.appointments[index] = action.payload[0]
                }
                if (state.selectedAppointment?.appointmentId === action.payload[0].appointmentId) {
                    state.selectedAppointment = action.payload[0]
                }
                state.error = null
            })
            .addCase(rescheduleAppointment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Delete appointment cases
            .addCase(deleteAppointment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.loading = false
                state.appointments = state.appointments.filter(a => a.id !== action.payload)
                if (state.selectedAppointment?.id === action.payload) {
                    state.selectedAppointment = null
                }
                state.error = null
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Fetch available slots cases
            .addCase(fetchAvailableSlots.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
                state.loading = false
                state.availableSlots = action.payload.data
                state.error = null
            })
            .addCase(fetchAvailableSlots.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Fetch today's appointments cases
            .addCase(fetchTodaysAppointments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTodaysAppointments.fulfilled, (state, action) => {
                state.loading = false
                state.todaysAppointments = action.payload.data
                state.error = null
            })
            .addCase(fetchTodaysAppointments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Fetch upcoming appointments cases
            .addCase(fetchUpcomingAppointments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUpcomingAppointments.fulfilled, (state, action) => {
                state.loading = false
                state.upcomingAppointments = action.payload.data
                state.error = null
            })
            .addCase(fetchUpcomingAppointments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Fetch appointment stats cases
            .addCase(fetchAppointmentStats.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAppointmentStats.fulfilled, (state, action) => {
                state.loading = false
                state.appointmentStats = action.payload.data
                state.error = null
            })
            .addCase(fetchAppointmentStats.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Check conflicts cases
            .addCase(checkAppointmentConflicts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkAppointmentConflicts.fulfilled, (state, action) => {
                state.loading = false
                state.conflicts = action.payload.data
                state.error = null
            })
            .addCase(checkAppointmentConflicts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const {
    setSearchTerm,
    setFilters,
    clearSelectedAppointment,
    clearError,
    clearConflicts,
    clearAvailableSlots,
    setPagination,
} = appointmentSlice.actions

export default appointmentSlice.reducer 