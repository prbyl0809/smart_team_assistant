import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Register from "./pages/RegisterPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Layout from "./shared/components/Layout";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
