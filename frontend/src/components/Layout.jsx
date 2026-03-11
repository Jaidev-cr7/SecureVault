import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, LayoutDashboard, LogOut, FileText } from 'lucide-react';

const Layout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 glass-card md:h-screen sticky top-0 md:rounded-r-2xl md:rounded-l-none border-l-0 border-y-0 rounded-none z-10 flex-shrink-0">
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-10 text-primary">
                        <Shield size={32} />
                        <h1 className="text-2xl font-bold font-sans tracking-tight text-white">SecureVault</h1>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${location.pathname === '/' ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                            <LayoutDashboard size={20} />
                            <span className="font-medium">Dashboard</span>
                        </Link>
                        <Link to="/audit-logs" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${location.pathname === '/audit-logs' ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                            <FileText size={20} />
                            <span className="font-medium">Audit Logs</span>
                        </Link>
                    </nav>

                    <div className="mt-10 pt-6 border-t border-slate-700/50">
                        <div className="mb-4">
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Logged in as</p>
                            <p className="font-medium text-slate-200 truncate">{user?.username || 'User'}</p>
                        </div>
                        <button onClick={logout} className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-2 hover:bg-red-500/10 rounded-lg">
                            <LogOut size={20} />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
                {children}
            </main>
        </div>
    );
};

export default Layout;
