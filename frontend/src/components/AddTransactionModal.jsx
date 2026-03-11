import { useState } from 'react';
import { X } from 'lucide-react';

const AddTransactionModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        category: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit({
            ...formData,
            amount: Number(formData.amount)
        });
        setLoading(false);
        setFormData({ type: 'expense', amount: '', category: '', description: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="glass-card w-full max-w-md p-8 relative z-10 animate-in fade-in zoom-in-95 duration-200 shadow-2xl shadow-black/50">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors focus:outline-none"
                >
                    <X size={20} />
                </button>

                <h3 className="text-2xl font-bold text-white mb-6">Add Transaction</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`cursor-pointer border-2 rounded-xl py-3 text-center font-bold tracking-wide transition-all ${formData.type === 'expense' ? 'bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-slate-700/50 text-slate-400 hover:bg-slate-800'}`}>
                            <input type="radio" name="type" value="expense" className="hidden"
                                checked={formData.type === 'expense'}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            />
                            EXPENSE
                        </label>
                        <label className={`cursor-pointer border-2 rounded-xl py-3 text-center font-bold tracking-wide transition-all ${formData.type === 'income' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'border-slate-700/50 text-slate-400 hover:bg-slate-800'}`}>
                            <input type="radio" name="type" value="income" className="hidden"
                                checked={formData.type === 'income'}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            />
                            INCOME
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                            <input
                                type="number"
                                required
                                step="0.01"
                                min="0.01"
                                className="input-field pl-8 font-mono text-lg"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Category</label>
                        <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="e.g. Groceries, Salary..."
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Description (Optional)</label>
                        <textarea
                            className="input-field min-h-[100px] resize-none"
                            placeholder="Add more details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full mt-4 py-3 text-base font-semibold"
                    >
                        {loading ? 'Saving...' : 'Save Transaction'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;
