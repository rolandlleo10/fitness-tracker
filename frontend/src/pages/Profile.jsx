import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Mail, LogOut, History } from 'lucide-react';

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
            <div className="max-w-lg mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center">
                    {/* Avatar with gender color */}
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold
            ${user.gender === 'female'
                        ? 'bg-gradient-to-br from-pink-500 to-rose-400'
                        : 'bg-gradient-to-br from-blue-500 to-cyan-400'}`}>
                        {user.gender === 'female' ? '♀' : '♂'}
                    </div>

                    <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                    <p className="text-white/60 mb-8 capitalize">{user.gender || 'Not set'}</p>

                    <div className="space-y-4 text-left mb-8">
                        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                            <User size={20} className="text-pink-400" />
                            <div>
                                <p className="text-xs text-white/50">Full Name</p>
                                <p className="font-medium">{user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                            <Mail size={20} className="text-pink-400" />
                            <div>
                                <p className="text-xs text-white/50">Email</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* History Button */}
                    <button
                        onClick={() => navigate('/history')}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium mb-4"
                    >
                        <History size={18} />
                        Activity History
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition font-medium"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}