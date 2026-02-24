import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'

function HeavenStats() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        api.get('souls/stats/')
            .then(res => setStats(res.data))
            .catch(err => console.log(err))
    }, [])

    if (!stats) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl mx-auto px-8 mt-8"
        >
            <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                >
                    <p className="text-2xl font-bold gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                        {stats.total.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm mt-1" style={{fontFamily: 'Crimson Text, serif'}}>
                        Souls Registered
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                >
                    <p className="text-2xl font-bold gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                        {stats.percentage}%
                    </p>
                    <p className="text-gray-400 text-sm mt-1" style={{fontFamily: 'Crimson Text, serif'}}>
                        Heaven Full
                    </p>
                </motion.div>
            </div>

            {/* Progress bar */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm" style={{fontFamily: 'Crimson Text, serif'}}>
                        Gates of Heaven
                    </span>
                    <span className="text-yellow-400 text-sm" style={{fontFamily: 'Crimson Text, serif'}}>
                        {stats.percentage}% claimed
                    </span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.percentage}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{background: 'linear-gradient(90deg, #c0932a, #f0d060, #c0932a)'}}
                    />
                </div>
                <div className="flex justify-between mt-1">
                    <span className="text-gray-600 text-xs">0</span>
                    <span className="text-gray-600 text-xs">144,000</span>
                </div>
            </div>
        </motion.div>
    )
}

export default HeavenStats