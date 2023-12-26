import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthProtection from './components/auth-protection';
import TrackAccount from './pages/track-account';
import CSV from './pages/CSV';
import { useState } from "react";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../src/styles/theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <div className='w-full h-full'>
              <Routes>
                <Route path="/sign-up" element={<h1>sign-up</h1>} />
                <Route path="/sign-in" element={<h1>in</h1>} />
                <Route element={
                  <AuthProtection>
                    <Outlet />
                  </AuthProtection>
                }>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/chat" element={<h1>chat</h1>} />
                  <Route path="/track-account/:id" element={<TrackAccount />} />
                  <Route path="/CSV" element={<CSV />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                </Route>
              </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;