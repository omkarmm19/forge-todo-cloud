import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "@/pages/Login"
import SignupPage from "@/pages/Signup"
import DashboardPage from "@/pages/Dashboard"
import LandingPage from "@/pages/Landing"
import { AuthProvider } from "@/components/auth/auth-context"
import { AuthGuard } from "@/components/auth/auth-guard"
import { RootLayout } from "@/components/layout/root-layout"
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <DashboardPage />
                </AuthGuard>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  )
}

export default App
