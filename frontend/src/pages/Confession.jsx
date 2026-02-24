import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'
import HeavenLayout from '../components/HeavenLayout'
import Navbar from '../components/Navbar'

function Confession() {
    const [content, setContent] = useState('')
    const [existing, setExisting] = useState(null)
    const [message, setMessage] = useState('')
    const [editing, setEditing] = useState(false)
    const isLoggedIn = localStorage.getItem('access_token')

    useEffect(() => {
        if (isLoggedIn) {
            api.get('souls/me/').then(res => {
             const mySoul = res.data
                if (mySoul && mySoul.id) {
                  api.get(`souls/${mySoul.id}/confessions/`).then(r => {
                       if (r.data.length > 0) setExisting(r.data[0])
                  })
             }
            }).catch(err => console.log(err))
     }
    }, [])

    const handleSubmit = async (e) => {
     e.preventDefault()
         try {
          const soulRes = await api.get('souls/me/')
           const mySoul = soulRes.data

          if (editing && existing) {
               const res = await api.put(`souls/${mySoul.id}/confessions/${existing.id}/`, { content })
               setExisting(res.data)
                setEditing(false)
                setMessage('Your confession has been updated. 🕊️')
            } else {
            const res = await api.post(`souls/${mySoul.id}/confessions/`, { content })
            setExisting(res.data)
            setMessage('Your confession has been heard. 🙏')
         }
     } catch (err) {
          setMessage('Something went wrong.')
        }
    }   
    if (!isLoggedIn) {
        return (
            <HeavenLayout>
                <div className="text-center w-full max-w-md px-8 mx-auto pt-32">
                    <div className="text-6xl mb-4">🚫</div>
                    <h1 className="text-3xl mb-4 gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                        Souls Only
                    </h1>
                    <p className="text-gray-300 mb-6" style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                        You must be registered to confess your sins
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

    return (
        <HeavenLayout>
            <div className="w-full max-w-2xl px-8 mx-auto pt-32 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <div className="text-6xl mb-4">🙏</div>
                    <h1 className="text-4xl mb-2 gold-text" style={{fontFamily: 'Cinzel, serif'}}>
                        Confess Your Sins
                    </h1>
                    <p className="text-gray-300" style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>
                        Speak your truth before the gates
                    </p>
                </motion.div>

                {message && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 p-4 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-center"
                    >
                        <p className="text-yellow-300" style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem'}}>{message}</p>
                    </motion.div>
                )}

                {existing && !editing ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-lg bg-white/5 border border-white/10"
                    >
                        <p className="text-gray-300 text-lg mb-6" style={{fontFamily: 'Crimson Text, serif', fontStyle: 'italic', lineHeight: '1.8'}}>
                            "{existing.content}"
                        </p>
                        <button
                            onClick={() => { setEditing(true); setContent(existing.content) }}
                            className="px-6 py-2 rounded-lg text-black font-semibold"
                            style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}
                        >
                            Edit Confession
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <textarea
                            placeholder="Speak your sins into the void..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-yellow-400 resize-none"
                            style={{fontFamily: 'Crimson Text, serif', fontSize: '1.1rem', lineHeight: '1.8'}}
                        />
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                className="flex-1 py-3 rounded-lg text-black font-semibold"
                                style={{background: 'linear-gradient(135deg, #f0d060, #c0932a)', fontFamily: 'Cinzel, serif'}}
                            >
                                {editing ? 'Update Confession' : 'Submit Confession'}
                            </motion.button>
                            {editing && (
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    className="px-6 py-3 rounded-lg text-gray-300 border border-white/20"
                                    style={{fontFamily: 'Cinzel, serif'}}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </motion.form>
                )}
            </div>
        </HeavenLayout>
    )
}

export default Confession