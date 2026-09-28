import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function LogActivity() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [type, setType] = useState('WALK');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/activities', {
                type,
                value: parseFloat(value),
                date,
                notes,
            });
            toast.success('Activity logged successfully!');
            setValue('');
            setNotes('');
            setTimeout(() => navigate('/'), 1200);
        } catch (err) {
            toast.error('Failed to log activity');
        } finally {
            setLoading(false);
        }
    };

    const units = {
        WALK: 'steps',
        WATER: 'ml',
        SLEEP: 'hours',
    };

    return (
        <div
            className="min-h-screen text-white"
            style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.90)), 
                          url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="max-w-lg mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                    <h1 className="text-2xl font-bold mb-6">Log Activity</h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Activity Type */}
                        <div>
                            <label className="block text-white/80 mb-2 text-sm">Activity Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['WALK', 'WATER', 'SLEEP'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setType(t)}
                                        className={`py-3 rounded-xl font-medium transition ${
                                            type === t
                                                ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white'
                                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Value */}
                        <div>
                            <label className="block text-white/80 mb-1 text-sm">
                                Value ({units[type]})
                            </label>
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                required
                                min="0"
                                step="any"
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder={`Enter ${units[type]}`}
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-white/80 mb-1 text-sm">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-white/80 mb-1 text-sm">Notes (optional)</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="Any notes..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 font-semibold hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Activity'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}