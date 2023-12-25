import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthProtection from './components/auth-protection';
// import Home from "./pages/Home";
// import Tables from "./pages/Tables";
// import Billing from "./pages/Billing";
// import Rtl from "./pages/Rtl";
// import Profile from "./pages/Profile";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Main from "./components/layout/Main";
import TrackAccount from './pages/track-account';
import CSV from './pages/CSV';

function App() {
  return (
    <div className='w-screen h-screen'>
      <Routes>
        <Route path="/sign-up" element={<h1>sign-up</h1>} />
        <Route path="/sign-in" element={<h1>in</h1>} />
        <Route element={
          <AuthProtection>
            <Outlet />
          </AuthProtection>
        }>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<h1>dashboard</h1>} />
          <Route path="/chat" element={<h1>chat</h1>} />
          <Route path="/track-account/:id" element={<TrackAccount />} />
          <Route path="/CSV" element={<CSV />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;