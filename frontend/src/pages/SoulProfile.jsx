import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'
import HeavenLayout from '../components/HeavenLayout'

function SoulProfile() {
    const { id } = useParams()
    const [soul, setSoul] = useState(null)
    const [confession, setConfession] = useState(null)
    const isLoggedIn = localStorage.getItem('access_token')

    useEffect(() => {
        api.get(`souls/${id}/`)
            .then(res => {
                setSoul(res.data)
                return api.get(`souls/${id}/confessions/`)
            })
            .then(res => {
                if (res.data.length > 0) setConfession(res.data[0])
            })
            .catch(err => console.log(err))
    }, [id])

    if (!isLoggedIn) {
        return (
            <HeavenLayout>
                <div className="text-center w-full max-w-md px-8 mx-auto pt-32">
                    <div className="text-6xl mb-4">🔒</div>
                    <h1 className="text-3xl mb-4 gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                        Souls Only
                    </h1>
                    <p className="text-gray-300 mb-6" style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                        Register your soul to read the confessions of others
                    </p>
                    <a href="/register"
                       className="px-6 py-3 rounded-lg text-black font-semibold"
                       style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}>
                        Register Your Soul
                    </a>
                </div>
            </HeavenLayout>
        )
    }

    if (!soul) {
        return (
            <HeavenLayout>
                <div className="text-center pt-32">
                    <p className="text-gray-300" style={{fontFamily: 'Crimson Text, serif'}}>Loading soul...</p>
                </div>
            </HeavenLayout>
        )
    }

    return (
        <HeavenLayout>
            <div className="w-full max-w-2xl px-8 mx-auto pt-32 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <div className="text-6xl mb-4">👤</div>
                    <h1 className="text-4xl mb-2 gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                        {soul.name}
                    </h1>
                    <p className="text-gray-400" style={{fontFamily: 'Crimson Text, serif'}}>
                        Registered {new Date(soul.created_at).toLocaleDateString()}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="p-6 rounded-lg bg-white/5 border border-white/10"
                >
                    <h2 className="text-xl mb-4 text-yellow-400" style={{fontFamily: 'Cinzel, serif'}}>
                        🙏 Their Confession
                    </h2>
                    {confession ? (
                        <p className="text-gray-300 text-lg" style={{fontFamily: 'Crimson Text, serif', fontStyle: 'italic', lineHeight: '1.8'}}>
                            "{confession.content}"
                        </p>
                    ) : (
                        <p className="text-gray-500" style={{fontFamily: 'Crimson Text, serif', fontStyle: 'italic'}}>
                            This soul has not yet confessed their sins...
                        </p>
                    )}
                </motion.div>

                <div className="text-center mt-8">
                    <a href="/leaderboard" className="text-yellow-400 hover:text-yellow-300"
                       style={{fontFamily: 'Crimson Text, serif'}}>
                        ← Back to Book of Heaven
                    </a>
                </div>
            </div>
        </HeavenLayout>
    )
}

export default SoulProfile