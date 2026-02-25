import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import api from '../api/axios'
import HeavenLayout from '../components/HeavenLayout'
import HeavenStats from '../components/HeavenStats'
import JesusQuote from '../components/JesusQuote'

function Home() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [mySoul, setMySoul] = useState(null)
    const [loading, setLoading] = useState(true)
    const isLoggedIn = localStorage.getItem('access_token')

    useEffect(() => {
        if (isLoggedIn) {
            api.get('souls/me/')
                .then(res => { setMySoul(res.data); setLoading(false) })
                .catch(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('souls/', { name })
            setMySoul(res.data)
            setMessage('Your soul has been registered in heaven! 🕊️')

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#f0d060', '#c0932a', '#ffffff', '#fff9c4'],
                shapes: ['circle', 'star'],
                scalar: 1.2
            })

            setTimeout(() => {
                confetti({
                    particleCount: 80,
                    angle: 60,
                    spread: 80,
                    origin: { x: 0 },
                    colors: ['#f0d060', '#ffffff'],
                })
                confetti({
                    particleCount: 80,
                    angle: 120,
                    spread: 80,
                    origin: { x: 1 },
                    colors: ['#f0d060', '#ffffff'],
                })
            }, 400)

        } catch (err) {
            setMessage('Something went wrong.')
        }
    }

    if (loading) {
        return (
            <HeavenLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <motion.p
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-gray-300 text-xl"
                        style={{fontFamily: 'Crimson Text, serif'}}
                    >
                        Opening the gates...
                    </motion.p>
                </div>
            </HeavenLayout>
        )
    }

    if (!isLoggedIn) {
        return (
            <HeavenLayout>
                <div className="min-h-screen flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center px-8 pt-24 pb-8">
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                            className="text-center max-w-2xl"
                        >
                           <motion.div
                                animate={{ 
                                    y: [0, -20, 0],
                                    rotate: [-2, 2, -2],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{ 
                                        duration: 4, 
                                        repeat: Infinity, 
                                        ease: "linear", // We use linear here because the keyframes create the curve
                                        times: [0, 0.5, 1] 
                            }}
                            className="text-8xl mb-6"
                            >
                                🪽
                            </motion.div>
                            <h1 className="text-6xl mb-4 gold-text gold-glow" style={{fontFamily: 'Cinzel, serif', lineHeight: '1.2'}}>
                                Heaven's Form
                            </h1>
                            <p className="text-gray-300 text-xl mb-10" style={{fontFamily: 'Crimson Text, serif', lineHeight: '1.8'}}>
                                144,000 spots. One eternity. Register your soul before the gates close forever.
                            </p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="flex gap-4 justify-center"
                            >
                                <a href="/register"
                                   className="px-8 py-3 rounded-lg text-black font-semibold tracking-wide"
                                   style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}>
                                    Register Your Soul
                                </a>
                                <a href="/login"
                                   className="px-8 py-3 rounded-lg text-yellow-400 font-semibold tracking-wide border border-yellow-400/30"
                                   style={{fontFamily: 'Cinzel, serif'}}>
                                    Sign In
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="w-full px-8 pb-12 grid grid-cols-2 gap-6 max-w-4xl mx-auto"
                    >
                        <HeavenStats />
                        <JesusQuote />
                    </motion.div>
                </div>
            </HeavenLayout>
        )
    }

    if (mySoul) {
        return (
            <HeavenLayout>
                <div className="min-h-screen flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center px-8 pt-24 pb-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-center max-w-2xl"
                        >
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="text-8xl mb-6"
                            >
                                👼
                            </motion.div>
                            <h1 className="text-5xl mb-3 gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                                Welcome, {mySoul.name}
                            </h1>
                            <p className="text-gray-300 text-lg mb-2" style={{fontFamily: 'Crimson Text, serif'}}>
                                Your soul is secured in heaven
                            </p>
                            <p className="text-yellow-400/50 mb-10" style={{fontFamily: 'Crimson Text, serif'}}>
                                ✝ Spot #{mySoul.id} in eternity ✝
                            </p>
                            <motion.div
                                className="flex gap-4 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <a href="/confession"
                                   className="px-8 py-3 rounded-lg text-black font-semibold tracking-wide"
                                   style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}>
                                    📜 Confess Your Sins
                                </a>
                                <a href="/leaderboard"
                                   className="px-8 py-3 rounded-lg text-yellow-400 font-semibold tracking-wide border border-yellow-400/30"
                                   style={{fontFamily: 'Cinzel, serif'}}>
                                    📖 Book of Heaven
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="w-full px-8 pb-12 grid grid-cols-2 gap-6 max-w-4xl mx-auto"
                    >
                        <HeavenStats />
                        <JesusQuote />
                    </motion.div>
                </div>
            </HeavenLayout>
        )
    }

    return (
        <HeavenLayout>
            <div className="min-h-screen flex flex-col items-center justify-center px-8 pt-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center w-full max-w-md"
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-7xl mb-6"
                    >
                        📜
                    </motion.div>
                    <h1 className="text-4xl mb-2 gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                        Claim Your Spot
                    </h1>
                    <p className="text-gray-300 mb-8 text-lg" style={{fontFamily: 'Crimson Text, serif', lineHeight: '1.8'}}>
                        Enter your name to be inscribed in the Book of Heaven
                    </p>

                    {message && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 rounded-lg bg-yellow-400/10 border border-yellow-400/30"
                        >
                            <p className="text-yellow-300" style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>{message}</p>
                        </motion.div>
                    )}

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-4 mb-10"
                    >
                        <input
                            type="text"
                            placeholder="Your soul name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-yellow-400"
                            style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}
                        />
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="w-full py-3 rounded-lg text-black font-semibold tracking-wide"
                            style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}
                        >
                            Inscribe My Soul
                        </motion.button>
                    </motion.form>
                </motion.div>

                <div className="w-full grid grid-cols-2 gap-6 max-w-4xl pb-12">
                    <HeavenStats />
                    <JesusQuote />
                </div>
            </div>
        </HeavenLayout>
    )
}

export default Home