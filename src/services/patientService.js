import { apiService } from './api.js'

class PatientService {
  // Get all patients with optional query parameters
  async getPatients(params = {}) {
    const response = await apiService.get(`/patients/multiple`)
    return response
  }

  // Get patient by ID
  async getPatientById(patientId) {
    return await apiService.get(`/patients/single/${patientId}`)
  }

  // Create new patient
  async createPatient(patientData) {
    return await apiService.post('/patients', patientData,
      // {
      //   headers: {
      //     "x-consent-token": localStorage.getItem('consentToken')
      //   }
      // }
    )
  }

  // Update existing patient
  async updatePatient(patientId, patientData) {
    return await apiService.put(`/patients/${patientId}`, patientData)
  }

  // Partially update patient
  async patchPatient(patientId, patientData) {
    return await apiService.patch(`/patients/${patientId}`, patientData)
  }

  // Delete patient
  async deletePatient(patientId) {
    await apiService.delete(`/patients/${patientId}`)
    return patientId // Return the ID for Redux state management
  }

  // Search patients
  async searchPatients(searchTerm, filters = {}) {
    const params = {
      search: searchTerm,
      ...filters
    }

    return await this.getPatients(params)
  }

  // Get patient statistics
  async getPatientStats() {
    return await apiService.get('/patients/stats')
  }

  // Get patients by status
  async getPatientsByStatus(status) {
    return await apiService.get(`/patients?status=${status}`)
  }

  // Get patient appointments
  async getPatientAppointments(patientId, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString
      ? `/patients/${patientId}/appointments?${queryString}`
      : `/patients/${patientId}/appointments`

    return await apiService.get(endpoint)
  }

  // Get patient medical history
  async getPatientMedicalHistory(patientId) {
    return await apiService.get(`/patients/${patientId}/medical-history`)
  }

  // Update patient medical history
  async updatePatientMedicalHistory(patientId, historyData) {
    return await apiService.put(`/patients/${patientId}/medical-history`, historyData)
  }

  // Get patient documents
  async getPatientDocuments(patientId) {
    return await apiService.get(`/patients/${patientId}/documents`)
  }

  // Upload patient document
  async uploadPatientDocument(patientId, documentData) {
    return await apiService.post(`/patients/${patientId}/documents`, documentData)
  }

  // Delete patient document
  async deletePatientDocument(patientId, documentId) {
    await apiService.delete(`/patients/${patientId}/documents/${documentId}`)
    return documentId
  }

  // Get patient insurance information
  async getPatientInsurance(patientId) {
    return await apiService.get(`/patients/${patientId}/insurance`)
  }

  // Update patient insurance
  async updatePatientInsurance(patientId, insuranceData) {
    return await apiService.put(`/patients/${patientId}/insurance`, insuranceData)
  }

  // Get patient emergency contacts
  async getPatientEmergencyContacts(patientId) {
    return await apiService.get(`/patients/${patientId}/emergency-contacts`)
  }

  // Update patient emergency contacts
  async updatePatientEmergencyContacts(patientId, contactsData) {
    return await apiService.put(`/patients/${patientId}/emergency-contacts`, contactsData)
  }

  // Archive patient (soft delete)
  async archivePatient(patientId) {
    return await apiService.patch(`/patients/${patientId}`, { archived: true })
  }

  // Restore archived patient
  async restorePatient(patientId) {
    return await apiService.patch(`/patients/${patientId}`, { archived: false })
  }

  // Get archived patients
  async getArchivedPatients() {
    return await apiService.get('/patients?archived=true')
  }

  // Bulk operations
  async bulkUpdatePatients(patientIds, updateData) {
    return await apiService.put('/patients/bulk', {
      patientIds,
      updateData
    })
  }

  async bulkDeletePatients(patientIds) {
    await apiService.delete('/patients/bulk', {
      patientIds
    })
    return patientIds
  }

  // Export patients data
  async exportPatients(format = 'csv', filters = {}) {
    const params = { format, ...filters }
    const queryString = new URLSearchParams(params).toString()

    return await apiService.get(`/patients/export?${queryString}`)
  }

  async requestConsentToken(patientId) {
    return await apiService.post(`/patients/seek-consent`, { patientId })
  }
}


// Create and export singleton instance
export const patientService = new PatientService()
export default PatientService 