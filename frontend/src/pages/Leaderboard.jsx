import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'
import HeavenLayout from '../components/HeavenLayout'
import HeavenStats from '../components/HeavenStats'

function Leaderboard() {
    const [souls, setSouls] = useState([])

    useEffect(() => {
        api.get('souls/')
            .then(response => setSouls(response.data))
            .catch(err => console.log(err))
    }, [])

    const getRankIcon = (index) => {
        if (index === 0) return '👑'
        if (index === 1) return '🌟'
        if (index === 2) return '✨'
        return '🕊️'
    }

    return (
        <HeavenLayout>
            <div className="w-full max-w-3xl px-4 md:px-8 mx-auto py-24 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <div className="text-5xl md:text-6xl mb-4">📖</div>
                    <h1 className="text-3xl md:text-4xl mb-2 gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                        Book of Heaven
                    </h1>
                    <p className="text-gray-300" style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                        {souls.length} souls have secured their place in eternity
                    </p>
                </motion.div>

                <HeavenStats />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {souls.map((soul, index) => (
                        <motion.a
                            key={soul.id}
                            href={`/souls/${soul.id}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            whileHover={{ scale: 1.03, y: -3 }}
                            className="block p-5 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-400/40 transition-all duration-300"
                            style={{backdropFilter: 'blur(10px)'}}
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-3xl">{getRankIcon(index)}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-lg truncate" style={{fontFamily: 'Crimson Text, serif'}}>
                                        {soul.name}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Spot #{index + 1} · {new Date(soul.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="text-yellow-400/50 text-xl">→</span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </HeavenLayout>
    )
}

export default Leaderboard