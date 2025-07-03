// Central export file for all services
export { apiService } from './api.js'
export { authService } from './authService.js'
export { patientService } from './patientService.js'
export { recordsService } from './recordsService.js'

// Re-export classes for testing or custom instances
export { default as ApiService } from './api.js'
export { default as AuthService } from './authService.js'
export { default as PatientService } from './patientService.js'
export { default as RecordsService } from './recordsService.js' 