import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Sidebar state
  sidebarOpen: true,
  sidebarCollapsed: false,
  
  // Modal states
  modals: {
    addPatient: false,
    editPatient: false,
    deletePatient: false,
    addRecord: false,
    editRecord: false,
    deleteRecord: false,
    patientDetails: false,
  },
  
  // Notifications
  notifications: [],
  
  // Theme
  theme: localStorage.getItem('theme') || 'light',
  
  // Loading states for different UI components
  loading: {
    global: false,
    dashboard: false,
    export: false,
  },
  
  // Search and filter UI states
  searchVisible: false,
  filtersVisible: false,
  
  // Selected items for bulk operations
  selectedItems: [],
  
  // Current page/view
  currentView: 'dashboard',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    
    // Modal actions
    openModal: (state, action) => {
      const { modalName, data } = action.payload
      state.modals[modalName] = true
      if (data) {
        state.modalData = data
      }
    },
    closeModal: (state, action) => {
      const modalName = action.payload
      state.modals[modalName] = false
      state.modalData = null
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false
      })
      state.modalData = null
    },
    
    // Notification actions
    addNotification: (state, action) => {
      const notification = {
        id: Date.now() + Math.random(),
        type: 'info',
        autoClose: true,
        duration: 5000,
        ...action.payload,
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    
    // Theme actions
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      state.theme = newTheme
      localStorage.setItem('theme', newTheme)
    },
    
    // Loading actions
    setLoading: (state, action) => {
      const { key, value } = action.payload
      state.loading[key] = value
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload
    },
    
    // Search and filter UI
    toggleSearch: (state) => {
      state.searchVisible = !state.searchVisible
    },
    setSearchVisible: (state, action) => {
      state.searchVisible = action.payload
    },
    toggleFilters: (state) => {
      state.filtersVisible = !state.filtersVisible
    },
    setFiltersVisible: (state, action) => {
      state.filtersVisible = action.payload
    },
    
    // Selection actions
    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload
    },
    addSelectedItem: (state, action) => {
      if (!state.selectedItems.includes(action.payload)) {
        state.selectedItems.push(action.payload)
      }
    },
    removeSelectedItem: (state, action) => {
      state.selectedItems = state.selectedItems.filter(
        item => item !== action.payload
      )
    },
    clearSelectedItems: (state) => {
      state.selectedItems = []
    },
    
    // View actions
    setCurrentView: (state, action) => {
      state.currentView = action.payload
    },
  },
})

export const {
  // Sidebar
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapsed,
  
  // Modals
  openModal,
  closeModal,
  closeAllModals,
  
  // Notifications
  addNotification,
  removeNotification,
  clearNotifications,
  
  // Theme
  setTheme,
  toggleTheme,
  
  // Loading
  setLoading,
  setGlobalLoading,
  
  // Search and filters
  toggleSearch,
  setSearchVisible,
  toggleFilters,
  setFiltersVisible,
  
  // Selection
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  clearSelectedItems,
  
  // View
  setCurrentView,
} = uiSlice.actions

export default uiSlice.reducer 