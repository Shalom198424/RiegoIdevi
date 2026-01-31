import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout/DashboardLayout';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { ProducerPage } from './pages/Producer/ProducerPage';
import { AdminPage } from './pages/Admin/AdminPage';
import { AdminHistoryPage } from './pages/Admin/AdminHistoryPage';
import { AdminNetworkPage } from './pages/Admin/AdminNetworkPage';
import { AdminSettingsPage } from './pages/Admin/AdminSettingsPage';
import { AdminProfilePage } from './pages/Admin/AdminProfilePage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { RequestIrrigationPage } from './pages/Producer/RequestIrrigationPage';

import { DDJJCPage } from './pages/Producer/DDJJCPage';
import { HistoryPage } from './pages/Producer/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas de Productor */}
        <Route path="/producer" element={<DashboardLayout />}>
          <Route index element={<ProducerPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="request" element={<RequestIrrigationPage />} />
          <Route path="ddjjc" element={<DDJJCPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>

        {/* Rutas de Administrador */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="history" element={<AdminHistoryPage />} />
          <Route path="network" element={<AdminNetworkPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
