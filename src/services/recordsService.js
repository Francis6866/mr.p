import { apiService } from './api.js'

class RecordsService {
  // Get all records with optional filters
  async getRecords() {
    const response = await apiService.get("/records/business")
    return response
  }

  // Get records by patient ID
  async getRecordsByBusiness() {
    const response = await apiService.get("/records/business")
    return response
  }

  // Get record by ID
  async getRecordById(recordId) { 
    const response = await apiService.get(`/records/single/${recordId}`) 
    return response
  }

  // Create new record
  async createRecord(recordData) {
    const response = await apiService.post('/records/create', recordData)
    if (response.status === 401) return alert(response.message)
    return response
  }

  // Update existing record
  async updateRecord(recordId, recordData) {
    return await apiService.put(`/records/${recordId}`, recordData)
  }

  // Partially update record
  async patchRecord(recordId, recordData) {
    return await apiService.patch(`/records/${recordId}`, recordData)
  }

  // Delete record
  async deleteRecord(recordId) {
    await apiService.delete(`/records/${recordId}`)
    return recordId
  }

  // Search records
  async searchRecords(searchTerm, filters = {}) {
    const params = {
      search: searchTerm,
      ...filters
    }

    return await this.getRecords(params)
  }

  // Get records by type
  async getRecordsByType(recordType, params = {}) {
    const allParams = { type: recordType, ...params }
    return await this.getRecords(allParams)
  }

  // Get records by date range
  async getRecordsByDateRange(startDate, endDate, params = {}) {
    const allParams = {
      dateFrom: startDate,
      dateTo: endDate,
      ...params
    }

    return await this.getRecords(allParams)
  }

  // Get recent records
  async getRecentRecords(limit = 10) {
    return await apiService.get(`/records/recent?limit=${limit}`)
  }

  // Get record statistics
  async getRecordStats(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString ? `/records/stats?${queryString}` : '/records/stats'

    return await apiService.get(endpoint)
  }

  // Get record attachments
  async getRecordAttachments(recordId) {
    return await apiService.get(`/records/${recordId}/attachments`)
  }

  // Upload record attachment
  async uploadRecordAttachment(recordId, attachmentData) {
    return await apiService.post(`/records/${recordId}/attachments`, attachmentData)
  }

  // Delete record attachment
  async deleteRecordAttachment(recordId, attachmentId) {
    await apiService.delete(`/records/${recordId}/attachments/${attachmentId}`)
    return attachmentId
  }

  // Get record templates
  async getRecordTemplates() {
    return await apiService.get('/records/templates')
  }

  // Create record from template
  async createRecordFromTemplate(templateId, recordData) {
    return await apiService.post(`/records/templates/${templateId}`, recordData)
  }

  // Get appointment records
  async getAppointmentRecords(appointmentId) {
    return await apiService.get(`/appointments/${appointmentId}/records`)
  }

  // Create appointment record
  async createAppointmentRecord(appointmentId, recordData) {
    return await apiService.post(`/appointments/${appointmentId}/records`, recordData)
  }

  // Get lab results
  async getLabResults(patientId, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString
      ? `/patients/${patientId}/lab-results?${queryString}`
      : `/patients/${patientId}/lab-results`

    return await apiService.get(endpoint)
  }

  // Create lab result
  async createLabResult(labResultData) {
    return await apiService.post('/lab-results', labResultData)
  }

  // Get prescriptions
  async getPrescriptions(patientId, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString
      ? `/patients/${patientId}/prescriptions?${queryString}`
      : `/patients/${patientId}/prescriptions`

    return await apiService.get(endpoint)
  }

  // Create prescription
  async createPrescription(prescriptionData) {
    return await apiService.post('/prescriptions', prescriptionData)
  }

  // Update prescription status
  async updatePrescriptionStatus(prescriptionId, status) {
    return await apiService.patch(`/prescriptions/${prescriptionId}`, { status })
  }

  // Get vital signs
  async getVitalSigns(patientId, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString
      ? `/patients/${patientId}/vital-signs?${queryString}`
      : `/patients/${patientId}/vital-signs`

    return await apiService.get(endpoint)
  }

  // Record vital signs
  async recordVitalSigns(vitalSignsData) {
    return await apiService.post('/vital-signs', vitalSignsData)
  }

  // Get diagnosis history
  async getDiagnosisHistory(patientId) {
    return await apiService.get(`/patients/${patientId}/diagnosis-history`)
  }

  // Add diagnosis
  async addDiagnosis(diagnosisData) {
    return await apiService.post('/diagnosis', diagnosisData)
  }

  // Bulk operations
  async bulkUpdateRecords(recordIds, updateData) {
    return await apiService.put('/records/bulk', {
      recordIds,
      updateData
    })
  }

  async bulkDeleteRecords(recordIds) {
    await apiService.delete('/records/bulk', {
      recordIds
    })
    return recordIds
  }

  // Export records
  async exportRecords(format = 'pdf', filters = {}) {
    const params = { format, ...filters }
    const queryString = new URLSearchParams(params).toString()

    return await apiService.get(`/records/export?${queryString}`)
  }

  // Archive record (soft delete)
  async archiveRecord(recordId) {
    return await apiService.patch(`/records/${recordId}`, { archived: true })
  }

  // Restore archived record
  async restoreRecord(recordId) {
    return await apiService.patch(`/records/${recordId}`, { archived: false })
  }

  // Get archived records
  async getArchivedRecords(params = {}) {
    const allParams = { archived: true, ...params }
    return await this.getRecords(allParams)
  }
}

// Create and export singleton instance
export const recordsService = new RecordsService()
export default RecordsService 