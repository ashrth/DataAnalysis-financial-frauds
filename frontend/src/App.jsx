import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import TrackAccount from './pages/track-account';
import CSV from './pages/CSV';
import Dashboard from "./pages/dashboard";
import Tickets from './pages/tickets';
import { AccountsProvider } from './hooks/useAccounts';
import AuthProtection from './components/auth-protection/auth-protection';
import AppShell from './layout/Topbar';
import { Suspense } from 'react';
import { Spin, theme } from 'antd';
import PageLayout from './layout/Sidebar';
import TableDemo from './pages/Accounts'; 

const { useToken } = theme

function App() {
  const { token } = useToken()

  return (
    <div className='m-0 p-0'>
      <Routes>
        <Route
          element={
            <AppShell>
              <Suspense
                fallback={
                  <div className="flex h-screen items-center justify-center">
                    <Spin tip={'Loading...'} style={{ color: token.colorPrimary }} />
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            </AppShell>
          }
        >
          <Route path="/sign-up" element={<h1>sign-up</h1>} />
          <Route path="/sign-in" element={<h1>in</h1>} />
          <Route element={
            <AccountsProvider>
              <AuthProtection>
                <PageLayout>
                  <Outlet />
                </PageLayout>
              </AuthProtection>
            </AccountsProvider>
          }>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/track-account/:id" element={<TrackAccount />} />
            <Route path="/CSV" element={<CSV />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Accounts" element={<TableDemo />} />
            {/* <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;