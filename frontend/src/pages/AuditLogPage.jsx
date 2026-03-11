import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Activity, ShieldAlert, ShieldCheck } from 'lucide-react';

const AuditLogPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await api.get('/logs');
                setLogs(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    if (loading) return <div className="flex h-64 items-center justify-center text-slate-400">Loading Secure Audit Trails...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <Activity size={32} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">System Audit Logs</h2>
                    <p className="text-slate-400 mt-1">Immutable record of all financial operations.</p>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                {logs.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="text-slate-500" size={32} />
                        </div>
                        <p className="text-lg">No audit events recorded.</p>
                        <p className="text-sm mt-1">Transaction creations and deletions will be logged here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/60 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-700/50">
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4">Action Event</th>
                                    <th className="px-6 py-4">Transaction REF</th>
                                    <th className="px-6 py-4 right">Amount Impact</th>
                                    <th className="px-6 py-4">IP Source (Trace)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {logs.map((log) => (
                                    <tr key={log._id} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm font-mono">
                                            {new Date(log.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.action === 'CREATE_TRANSACTION' ? (
                                                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit border border-emerald-500/20 shadow-sm">
                                                    <ShieldCheck size={16} />
                                                    <span className="text-xs font-bold tracking-wider">CREATE_TRANSACTION</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg w-fit border border-red-500/20 shadow-sm">
                                                    <ShieldAlert size={16} />
                                                    <span className="text-xs font-bold tracking-wider">DELETE_TRANSACTION</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-300 font-mono text-sm tracking-wide">
                                            {log.transactionId?._id || log.transactionId || 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-200 font-mono font-medium text-lg">
                                            ${log.amount?.toFixed(2) || '0.00'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-sm font-mono">
                                            {log.ipAddress || '127.0.0.1'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuditLogPage;
