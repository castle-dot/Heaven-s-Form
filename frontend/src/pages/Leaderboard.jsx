import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'
import HeavenLayout from '../components/HeavenLayout'
import HeavenStats from '../components/HeavenStats'

function Leaderboard() {
    const [souls, setSouls] = useState([])
    const [stats, setStats] = useState(null)

    useEffect(() => {
        api.get('souls/')
            .then(response => setSouls(response.data))
            .catch(err => console.log(err))
        
        api.get('souls/stats/')
            .then(response => setStats(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <HeavenLayout>
            <div className="w-full max-w-2xl px-8 mx-auto py-32">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <div className="text-6xl mb-4">📖</div>
                    <h1 className="text-4xl mb-2 gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                        Book of Heaven
                    </h1>
                    <p className="text-gray-300" style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                        {souls.length} souls have secured their place in eternity
                    </p>
                </motion.div>

                {/* Stats Section */}
                  <HeavenStats />

                {/* Souls list */}
                <div className="space-y-3">
                    {souls.map((soul, index) => (
                        <motion.a
                            key={soul.id}
                            href={`/souls/${soul.id}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 cursor-pointer"
                            style={{display: 'flex'}}
                        >
                            <span className="text-2xl font-bold w-12 text-center"
                                  style={{fontFamily: 'Cinzel, serif', color: '#f0d060'}}>
                                #{index + 1}
                            </span>
                            <div>
                                <p className="text-white text-lg" style={{fontFamily: 'Crimson Text, serif'}}>
                                    {soul.name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Registered {new Date(soul.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <span className="ml-auto text-yellow-400/50">→</span>
                        </motion.a>
                    ))}
                </div>
            </div>
          
        </HeavenLayout>
    )
}

export default Leaderboard