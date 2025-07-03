import { apiService } from './api.js'

class AppointmentService {
    // Get all appointments with optional query parameters
    async getAppointments(params = {}) {
        const response = await apiService.get(`/appointments`, { params })
        return response
    }

    // Get appointments by business
    async getAppointmentsByPatientBusiness(patientId, params = {}) {
        const response = await apiService.get(`/appointments/patient/${patientId}`, { params })
        return response
    }

    // Get appointment by ID
    async getAppointmentById(appointmentId) {
        return await apiService.get(`/appointments/${appointmentId}`)
    }

    // Get appointments by patient
    async getAppointmentsByPatient(patientId, params = {}) {
        const response = await apiService.get(`/appointments/patient/${patientId}`, { params })
        return response
    }

    // Get appointments by doctor
    async getAppointmentsByDoctor(doctorId, params = {}) {
        const response = await apiService.get(`/appointments/doctor/${doctorId}`, { params })
        return response
    }

    // Create new appointment
    async createAppointment(appointmentData) {
        return await apiService.post('/appointments/create', appointmentData)
    }

    // Update existing appointment
    async updateAppointment(appointmentId, appointmentData) {
        return await apiService.put(`/appointments/${appointmentId}`, appointmentData)
    }

    // Partially update appointment
    async patchAppointment(appointmentId, appointmentData) {
        return await apiService.patch(`/appointments/${appointmentId}`, appointmentData)
    }

    // Delete appointment
    async deleteAppointment(appointmentId) {
        await apiService.delete(`/appointments/${appointmentId}`)
        return appointmentId // Return the ID for Redux state management
    }

    // Cancel appointment
    async cancelAppointment(appointmentId, reason = '') {
        return await apiService.patch(`/appointments/${appointmentId}/cancel`, { reason })
    }

    // Reschedule appointment
    async rescheduleAppointment(appointmentId, updateData) {
        return await apiService.patch(`/appointments/reschedule/${appointmentId}`, updateData)
    }

    // Confirm appointment
    async confirmAppointment(appointmentId) {
        return await apiService.patch(`/appointments/${appointmentId}/confirm`)
    }

    // Mark appointment as completed
    async completeAppointment(appointmentId, completionData = {}) {
        return await apiService.patch(`/appointments/${appointmentId}/complete`, completionData)
    }

    // Mark appointment as no-show
    async markNoShow(appointmentId) {
        return await apiService.patch(`/appointments/${appointmentId}/no-show`)
    }

    // Get available time slots
    async getAvailableSlots(doctorId, date) {
        return await apiService.get(`/appointments/available-slots`, {
            params: { doctorId, date }
        })
    }

    // Search appointments
    async searchAppointments(searchTerm, filters = {}) {
        const params = {
            search: searchTerm,
            ...filters
        }

        return await this.getAppointments(params)
    }

    // Get appointment statistics
    async getAppointmentStats(params = {}) {
        return await apiService.get('/appointments/stats', { params })
    }

    // Get appointments by status
    async getAppointmentsByStatus(status, params = {}) {
        return await apiService.get(`/appointments`, {
            params: { status, ...params }
        })
    }

    // Get appointments by date range
    async getAppointmentsByDateRange(startDate, endDate, params = {}) {
        return await apiService.get('/appointments', {
            params: {
                startDate,
                endDate,
                ...params
            }
        })
    }

    // Get today's appointments
    async getTodaysAppointments(params = {}) {
        const today = new Date().toISOString().split('T')[0]
        return await this.getAppointmentsByDateRange(today, today, params)
    }

    // Get upcoming appointments
    async getUpcomingAppointments(days = 7, params = {}) {
        const today = new Date()
        const endDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)

        return await this.getAppointmentsByDateRange(
            today.toISOString().split('T')[0],
            endDate.toISOString().split('T')[0],
            params
        )
    }

    // Send appointment reminder
    async sendReminder(appointmentId, method = 'email') {
        return await apiService.post(`/appointments/${appointmentId}/send-reminder`, { method })
    }

    // Bulk operations
    async bulkUpdateAppointments(appointmentIds, updateData) {
        return await apiService.put('/appointments/bulk', {
            appointmentIds,
            updateData
        })
    }

    async bulkDeleteAppointments(appointmentIds) {
        await apiService.delete('/appointments/bulk', {
            data: { appointmentIds }
        })
        return appointmentIds
    }

    async bulkCancelAppointments(appointmentIds, reason = '') {
        return await apiService.patch('/appointments/bulk/cancel', {
            appointmentIds,
            reason
        })
    }

    // Export appointments data
    async exportAppointments(format = 'csv', filters = {}) {
        const params = { format, ...filters }
        const queryString = new URLSearchParams(params).toString()

        return await apiService.get(`/appointments/export?${queryString}`)
    }

    // Get appointment conflicts
    async checkConflicts(doctorId, date, time, duration) {
        return await apiService.get('/appointments/check-conflicts', {
            params: { doctorId, date, time, duration }
        })
    }

    // Get appointment history for a patient
    async getPatientAppointmentHistory(patientId, params = {}) {
        return await apiService.get(`/patients/${patientId}/appointment-history`, { params })
    }
}

// Create and export singleton instance
export const appointmentService = new AppointmentService()
export default AppointmentService 