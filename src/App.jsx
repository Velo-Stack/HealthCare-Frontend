/**
 * App Entry Point
 * Main application with routing and authentication
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Auth
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UsersListPage from './pages/users/UsersListPage';
import UserDetailsPage from './pages/users/UserDetailsPage';
import InsuranceListPage from './pages/insurance/InsuranceListPage';
import InsuranceFormPage from './pages/insurance/InsuranceFormPage';
import OrdersListPage from './pages/orders/OrdersListPage';
import OrderDetailsPage from './pages/orders/OrderDetailsPage';

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route - Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes - Dashboard */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Dashboard */}
              <Route path="/" element={<DashboardPage />} />

              {/* Users */}
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/users/:id" element={<UserDetailsPage />} />

              {/* Insurance */}
              <Route path="/insurance" element={<InsuranceListPage />} />
              <Route path="/insurance/new" element={<InsuranceFormPage />} />
              <Route path="/insurance/edit/:id" element={<InsuranceFormPage />} />

              {/* Orders */}
              <Route path="/orders" element={<OrdersListPage />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFFFF',
              color: '#1A1A1A',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#82C341',
                secondary: '#FFFFFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#E53935',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
