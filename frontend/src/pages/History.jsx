import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Trash2, Activity, Droplets, Moon } from 'lucide-react';

export default function History() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("User in History page:", user);   // ← add this line

        if (!user) {
            navigate('/login');
            return;
        }
        fetchActivities();
    }, [user]);

    const fetchActivities = async () => {
        console.log("Starting to fetch activities...");
        try {
            console.log("Calling API...");
            const res = await api.get('/activities/recent');
            console.log("API Response:", res.data);
            setActivities(res.data);
        } catch (err) {
            console.error("Error fetching activities:", err);
            toast.error('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this activity?')) return;

        try {
            await api.delete(`/activities/${id}`);
            setActivities(activities.filter((a) => a.id !== id));
            toast.success('Activity deleted');
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const getIcon = (type) => {
        if (type === 'WALK') return <Activity className="text-indigo-400" size={20} />;
        if (type === 'WATER') return <Droplets className="text-cyan-400" size={20} />;
        return <Moon className="text-violet-400" size={20} />;
    };

    const getUnit = (type) => {
        if (type === 'WALK') return 'steps';
        if (type === 'WATER') return 'ml';
        return 'hours';
    };

    return (
        <div
            className="min-h-screen text-white"
            style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.90)), 
                          url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="max-w-3xl mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                <h1 className="text-3xl font-bold mb-8">Activity History</h1>

                {loading ? (
                    <div className="text-center text-white/50 py-20">Loading...</div>
                ) : activities.length === 0 ? (
                    <div className="text-center text-white/50 py-20">
                        No activities yet. Go log some!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center justify-between hover:bg-black/50 transition"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-white/10">
                                        {getIcon(activity.type)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">
                                            {activity.value} {getUnit(activity.type)}
                                        </p>
                                        <p className="text-white/60 text-sm">
                                            {activity.type} • {activity.date}
                                            {activity.notes && ` • ${activity.notes}`}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDelete(activity.id)}
                                    className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}