import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Droplets, Moon, Plus, User } from 'lucide-react';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchWeeklyStats();
    }, [user]);

    const fetchWeeklyStats = async () => {
        try {
            const res = await api.get('/activities/week');
            setStats(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const chartData = stats
        ? stats.labels.map((label, index) => ({
            day: label,
            walk: stats.series.WALK?.[index] || 0,
            water: stats.series.WATER?.[index] || 0,
            sleep: stats.series.SLEEP?.[index] || 0,
        }))
        : [];

    return (
        <div
            className="min-h-screen text-white"
            style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.90)), 
                          url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

                    {/* Left side - Log button */}
                    <button
                        onClick={() => navigate('/log')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 font-medium hover:opacity-90 transition"
                    >
                        <Plus size={18} />
                        Log Activity
                    </button>

                    {/* Right side - Profile */}
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-xl transition"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium">Hi, {user?.name}</p>
                            <p className="text-xs text-white/60">View Profile</p>
                        </div>

                        {/* Gender Icon */}
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg
              ${user?.gender === 'female'
                            ? 'bg-gradient-to-br from-pink-500 to-rose-400'
                            : 'bg-gradient-to-br from-blue-500 to-cyan-400'}`}>
                            {user?.gender === 'female' ? '♀' : '♂'}
                        </div>
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-6">Weekly Progress</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="text-indigo-400" />
                            <span className="text-white/70">Total Steps</span>
                        </div>
                        <p className="text-3xl font-bold">
                            {chartData.reduce((sum, d) => sum + d.walk, 0).toLocaleString()}
                        </p>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Droplets className="text-cyan-400" />
                            <span className="text-white/70">Water (ml)</span>
                        </div>
                        <p className="text-3xl font-bold">
                            {chartData.reduce((sum, d) => sum + d.water, 0).toLocaleString()}
                        </p>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Moon className="text-violet-400" />
                            <span className="text-white/70">Sleep (hours)</span>
                        </div>
                        <p className="text-3xl font-bold">
                            {chartData.reduce((sum, d) => sum + d.sleep, 0).toFixed(1)}
                        </p>
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-medium mb-6">This Week</h3>
                    {loading ? (
                        <div className="h-80 flex items-center justify-center text-white/50">
                            Loading chart...
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="day" stroke="#ffffff60" />
                                <YAxis stroke="#ffffff60" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: 'none',
                                        borderRadius: '12px',
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="walk" name="Steps" fill="#818cf8" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="water" name="Water (ml)" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="sleep" name="Sleep (h)" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </main>
        </div>
    );
}