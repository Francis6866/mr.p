import { BaseUrl } from '../utility/index.js'
import { apiService } from './api.js'

class AuthService {
  // Login user
  async login(credentials) {
    const data = await apiService.post('/auth/login', credentials, { includeAuth: false })
    // Store token in localStorage
    if (data.success === false) return {
      success: false,
      message: data.message,
      data: null
    }
    localStorage.setItem('token', data.data.accessToken)
    localStorage.setItem('user', JSON.stringify({ ...data.data, accessToken: null }))
    return {
      success: true,
      message: data.message,
      data: data.data
    }
  }

  // Register new user
  async register(userData) {
    const data = await apiService.post('/auth/register', userData, { includeAuth: false })

    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token)
    }

    return data
  }

  // Logout user
  async logout() {
    try {
      // Call logout endpoint if available
      await apiService.post('/auth/logout')
    } catch (error) {
      // Continue with local logout even if API call fails
      console.warn('Logout API call failed:', error.message)
    } finally {
      // Always remove token from localStorage
      localStorage.removeItem('token')
    }
  }

  // Refresh token
  async refreshToken() {
    const data = await apiService.post('/auth/refresh')

    if (data.token) {
      localStorage.setItem('token', data.token)
    }

    return data
  }

  // Get current user profile
  async getCurrentUser() {
    return await apiService.get('/auth/me')
  }

  // Update user profile
  async updateProfile(userData) {
    return await apiService.put('/auth/profile', userData)
  }

  // Change password
  async changePassword(passwordData) {
    return await apiService.put('/auth/password', passwordData)
  }

  // Request password reset
  async requestPasswordReset(email) {
    return await apiService.post('/auth/forgot-password', { email }, { includeAuth: false })
  }

  // Reset password with token
  async resetPassword(token, newPassword) {
    return await apiService.post('/auth/reset-password', {
      token,
      password: newPassword
    }, { includeAuth: false })
  }

  // Verify email
  async verifyEmail(token) {
    return await apiService.post('/auth/verify-email', { token }, { includeAuth: false })
  }

  // Resend verification email
  async resendVerification(email) {
    return await apiService.post('/auth/resend-verification', { email }, { includeAuth: false })
  }

  // Check if user is authenticated (has valid token)
  isAuthenticated() {
    const token = localStorage.getItem('token')
    if (!token) return false

    try {
      // Basic token validation (you might want to add more sophisticated checks)
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000 
      return payload.exp > currentTime
    } catch (error) {
      // If token is malformed, consider it invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return false
    }
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('token')
  }
}

// Create and export singleton instance
export const authService = new AuthService()
export default AuthService 