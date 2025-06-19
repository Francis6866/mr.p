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

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/register" element={<MultiStepForm />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="patient" element={<PatientDashboard /> }/>
          <Route path="records" element={<RecordsDashboard /> }/>
          <Route path="medic-card" element={<RecordsDashboard />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
