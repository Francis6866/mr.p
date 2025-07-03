import { BaseUrl } from "../utility"

// Base API service with common functionality
class ApiService {
  constructor(baseURL = BaseUrl) {
    this.baseURL = baseURL
  }

  // Create headers with authentication
  createHeaders(includeAuth = true, customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    }

    if (includeAuth) {
      const token = localStorage.getItem('token')
      if (token) {
        headers.Authorization = `Bearer ${token}`
        headers.DashboardRole = true
      }
    }

    return headers
  }

  // Handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const message = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
      return { success: false, message }
    }

    // Handle different response types
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }

    return response
  }

  // Generic GET request
  async get(endpoint, options = {}) {
    const { includeAuth = true, headers: customHeaders = {} } = options

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.createHeaders(includeAuth, customHeaders),
    })

    return this.handleResponse(response)
  }

  // Generic POST request
  async post(endpoint, data = null, options = {}) {
    const { includeAuth = true, headers: customHeaders = {} } = options

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.createHeaders(includeAuth, customHeaders),
      body: data ? JSON.stringify(data) : null,
    })

    return this.handleResponse(response)
  }

  // Generic PUT request
  async put(endpoint, data = null, options = {}) {
    const { includeAuth = true, headers: customHeaders = {} } = options

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.createHeaders(includeAuth, customHeaders),
      body: data ? JSON.stringify(data) : null,
    })

    return this.handleResponse(response)
  }

  // Generic PATCH request
  async patch(endpoint, data = null, options = {}) {
    const { includeAuth = true, headers: customHeaders = {} } = options

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.createHeaders(includeAuth, customHeaders),
      body: data ? JSON.stringify(data) : null,
    })

    return this.handleResponse(response)
  }

  // Generic DELETE request
  async delete(endpoint, options = {}) {
    const { includeAuth = true, headers: customHeaders = {} } = options

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.createHeaders(includeAuth, customHeaders),
    })

    return this.handleResponse(response)
  }
}

// Create and export a singleton instance
export const apiService = new ApiService()

// Export the class for testing or custom instances
export default ApiService 