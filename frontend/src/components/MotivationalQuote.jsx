import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const quotes = [
    "The only bad workout is the one that didn’t happen.",
    "Push yourself because no one else is going to do it for you.",
    "Success starts with self-discipline.",
    "Don’t limit your challenges. Challenge your limits.",
    "It never gets easier. You just get stronger.",
    "Your body can stand almost anything. It’s your mind you have to convince.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Small progress is still progress.",
    "Discipline is choosing between what you want now and what you want most.",
    "You don’t have to be extreme, just consistent.",
];

export default function MotivationalQuote() {
    const [show, setShow] = useState(false);
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const today = new Date().toDateString();
        const lastShown = localStorage.getItem('quoteShownDate');

        if (lastShown !== today) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(randomQuote);
            setShow(true);
            localStorage.setItem('quoteShownDate', today);
        }
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 max-w-md w-full border border-white/20 relative shadow-2xl">
                <button
                    onClick={() => setShow(false)}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition"
                >
                    <X size={22} />
                </button>

                <div className="text-center">
                    <p className="text-pink-400 text-sm font-medium mb-3">Daily Motivation</p>
                    <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                        “{quote}”
                    </p>
                    <button
                        onClick={() => setShow(false)}
                        className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 font-medium hover:opacity-90 transition"
                    >
                        Let’s Go!
                    </button>
                </div>
            </div>
        </div>
    );
}