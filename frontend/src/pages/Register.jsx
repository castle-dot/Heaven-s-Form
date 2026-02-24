import { useState } from 'react'
import api from '../api/axios'
import HeavenLayout from '../components/HeavenLayout'

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('register/', { username, password })
        
        // Auto login after registration
         const loginRes = await api.post('token/', { username, password })
            localStorage.setItem('access_token', loginRes.data.access)
            localStorage.setItem('refresh_token', loginRes.data.refresh)
        
                window.location.href = '/'
            } catch (err) {
        setError('Registration failed. Try a different username.')
    }
}

    return (
        <HeavenLayout>
            <div className="text-center w-full max-w-md px-8 mx-auto">
                <div className="text-6xl mb-4">⛪</div>
                <h1 className="text-4xl mb-2 gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                    Heaven's Gate
                </h1>
                <p className="text-gray-300 mb-8" style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                    Create your account to begin your journey
                </p>

                {error && <p className="text-red-400 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-yellow-400"
                        style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}
                    />
                    <input
                        type="password"
                        placeholder="Choose a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-yellow-400"
                        style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg text-black font-semibold tracking-wide transition-all duration-300 hover:opacity-90"
                        style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}
                    >
                        Enter the Gates
                    </button>
                </form>

                <p className="mt-6 text-gray-300">
                    Already have an account?{' '}
                    <a href="/login" className="text-yellow-400 hover:text-yellow-300">Sign in</a>
                </p>
            </div>
        </HeavenLayout>
    )
}

export default Register