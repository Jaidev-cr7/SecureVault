import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AuditLogPage from './pages/AuditLogPage';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) return <Navigate to="/auth" />;
    return <Layout>{children}</Layout>;
};

function App() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />

                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                <Route path="/audit-logs" element={
                    <ProtectedRoute>
                        <AuditLogPage />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
