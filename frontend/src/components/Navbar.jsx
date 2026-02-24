import { motion } from 'framer-motion'

function Navbar() {
    const isLoggedIn = localStorage.getItem('access_token')

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
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
            style={{
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(240, 208, 96, 0.2)'
            }}
        >
            {/* Logo */}
            <a href="/" style={{fontFamily: 'Cinzel, serif'}} className="gold-text text-xl font-bold">
                Heaven's Form
            </a>

            {/* Links */}
            <div className="flex items-center gap-6">
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
        </motion.nav>
    )
}

export default Navbar