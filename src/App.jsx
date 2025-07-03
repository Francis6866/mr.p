import { Route, Routes } from "react-router-dom"
import ForgotForm from "./components/ForgotForm"
import LoginForm from "./components/LoginForm"
import MultiStepForm from "./components/MultiStepForm"
import DashboardLayout from "./layouts/DashboardLayout"
import LoginSignupPage from "./pages/LoginSignupPage"
import HomeDashboard from "./pages/HomeDashbord"
import PatientDashboard from "./pages/PatientDashboard"
import PatientMoney from "./components/PatientMoney"
import RecordsDashboard from "./pages/RecordsDashboard"
import PatientProfile from "./pages/patientProfile"
import PatientRecords from "./pages/records"
import ViewRecord from "./pages/view-record"
import MedicardDashboard from "./pages/medicardDashboard"
import ViewCard from "./pages/view-card"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/register" element={<MultiStepForm />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="patients" element={<PatientDashboard />} />
          <Route path="patients/records/:healthId" element={<PatientRecords />} />
          <Route path="patient/:id" element={<PatientProfile />} />
          <Route path="records" element={<RecordsDashboard />} />
          <Route path="medicards" element={<MedicardDashboard />} />
          <Route path="view-card/:cardId" element={<ViewCard />} />
          <Route path="record/view-record/:recordId/:patientId" element={<ViewRecord />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
