import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
    const isLoggedIn = localStorage.getItem('access_token')
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/'
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
            style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(240, 208, 96, 0.2)'
            }}
        >
            {/* Logo */}
            <a href="/" className="gold-text text-lg font-bold" style={{fontFamily: 'Cinzel, serif'}}>
                Heaven's Form
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
                <a href="/leaderboard"
                   className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                   style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                    📖 Book of Heaven
                </a>
                {isLoggedIn && (
                    <a href="/confession"
                       className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                       style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                        📜 Confession
                    </a>
                )}
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg text-black text-sm font-semibold"
                        style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}
                    >
                        Depart
                    </button>
                ) : (
                    <a href="/login"
                       className="px-4 py-2 rounded-lg text-black text-sm font-semibold"
                       style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}>
                        Enter
                    </a>
                )}
            </div>

            {/* Mobile Hamburger */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-yellow-400 text-2xl focus:outline-none"
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 right-0 flex flex-col gap-2 px-6 py-4"
                        style={{
                            background: 'rgba(0,0,0,0.9)',
                            backdropFilter: 'blur(10px)',
                            borderBottom: '1px solid rgba(240, 208, 96, 0.2)'
                        }}
                    >
                        <a href="/leaderboard"
                           onClick={() => setMenuOpen(false)}
                           className="text-gray-300 hover:text-yellow-400 py-2 transition-colors duration-300"
                           style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                            📖 Book of Heaven
                        </a>
                        {isLoggedIn && (
                            <a href="/confession"
                               onClick={() => setMenuOpen(false)}
                               className="text-gray-300 hover:text-yellow-400 py-2 transition-colors duration-300"
                               style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                                📜 Confession
                            </a>
                        )}
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="py-2 px-4 rounded-lg text-black font-semibold text-left w-full mt-2"
                                style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}
                            >
                                Depart
                            </button>
                        ) : (
                            <a href="/login"
                               onClick={() => setMenuOpen(false)}
                               className="py-2 px-4 rounded-lg text-black font-semibold text-center mt-2"
                               style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}>
                                Enter
                            </a>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar