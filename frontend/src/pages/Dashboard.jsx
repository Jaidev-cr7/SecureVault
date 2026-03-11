import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, TrendingUp, TrendingDown, DollarSign, Trash2 } from 'lucide-react';
import AddTransactionModal from '../components/AddTransactionModal';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            const res = await api.get('/transactions');
            setTransactions(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleAddTransaction = async (data) => {
        try {
            await api.post('/transactions', data);
            fetchTransactions();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction from the vault? This action will strictly be logged in the audit trail.')) {
            try {
                await api.delete(`/transactions/${id}`);
                fetchTransactions();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const balance = income - expense;

    if (loading) return <div className="flex h-64 items-center justify-center text-slate-400">Authenticating Vault Data...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Overview</h2>
                    <p className="text-slate-400 mt-1">Track your financial security and audit trails.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    <span>New Transaction</span>
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-slate-400 font-semibold tracking-wide uppercase text-sm">Net Balance</h3>
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <p className="text-4xl font-bold text-white relative z-10 tracking-tight">${balance.toFixed(2)}</p>
                </div>

                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-slate-400 font-semibold tracking-wide uppercase text-sm">Total Income</h3>
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <p className="text-4xl font-bold text-emerald-400 relative z-10 tracking-tight">+${income.toFixed(2)}</p>
                </div>

                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-700"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-slate-400 font-semibold tracking-wide uppercase text-sm">Total Expenses</h3>
                        <div className="p-2.5 bg-red-500/10 rounded-xl text-red-400 border border-red-500/20">
                            <TrendingDown size={20} />
                        </div>
                    </div>
                    <p className="text-4xl font-bold text-red-400 relative z-10 tracking-tight">-${expense.toFixed(2)}</p>
                </div>
            </div>

            {/* Transactions List */}
            <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-slate-700/50 bg-slate-800/20">
                    <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
                </div>

                {transactions.length === 0 ? (
                    <div className="p-10 text-center text-slate-400 flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <DollarSign className="text-slate-500" size={32} />
                        </div>
                        <p className="text-lg">No transactions found in the vault.</p>
                        <p className="text-sm mt-1">Add your first transaction to initiate the audit trail.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider border-b border-slate-700/50">
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Description</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold text-right">Amount</th>
                                    <th className="px-6 py-4 font-semibold text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {transactions.map(t => (
                                    <tr key={t._id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm font-mono">
                                            {new Date(t.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-slate-200 font-medium tracking-wide">
                                            {t.description || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-slate-800 text-slate-300 border border-slate-700">
                                                {t.category}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-right font-bold font-mono text-lg ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleDelete(t._id)}
                                                className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors focus:outline-none"
                                                title="Delete Transaction"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTransaction}
            />
        </div>
    );
};

export default Dashboard;
