import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Shield } from 'lucide-react';

const AuthPage = () => {
    const { login, register } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await register(formData.username, formData.email, formData.password);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-darkBg">
            {/* Decorative background blobs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="glass-card w-full max-w-md p-8 sm:p-10 relative z-10 transition-all duration-500 shadow-2xl shadow-primary/5">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 border border-slate-700 shadow-inner mb-6 relative">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>
                        <Shield size={40} className="text-primary relative z-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-slate-400">Secure Audit-Log Driven Expense Manager</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Username</label>
                            <input
                                type="text"
                                required
                                className="input-field"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="input-field tracking-widest font-mono"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full mt-8 py-3 text-lg font-semibold"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="text-primary hover:text-blue-400 font-semibold transition-colors focus:outline-none"
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
