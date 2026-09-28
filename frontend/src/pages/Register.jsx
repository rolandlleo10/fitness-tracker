import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!gender) {
            toast.error('Please select your gender');
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password, gender);
            toast.success('Account created successfully!');
            navigate('/');
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.88)), 
                          url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
                <h1 className="text-3xl font-bold text-white text-center mb-2">Create Account</h1>
                <p className="text-white/70 text-center mb-8">Start tracking your fitness journey</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-white/80 mb-1 text-sm">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                            placeholder="Fitness Goal"
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 mb-1 text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Gender Selection */}
                    <div>
                        <label className="block text-white/80 mb-2 text-sm">Gender</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setGender('male')}
                                className={`py-3 rounded-xl font-medium transition ${
                                    gender === 'male'
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                            >
                                Male
                            </button>
                            <button
                                type="button"
                                onClick={() => setGender('female')}
                                className={`py-3 rounded-xl font-medium transition ${
                                    gender === 'female'
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                            >
                                Female
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-white/60 mt-6 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-pink-300 hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}