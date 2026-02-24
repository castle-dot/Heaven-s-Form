import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const quotes = [
    { text: "I am the way, the truth, and the life.", reference: "John 14:6" },
    { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28" },
    { text: "For God so loved the world that he gave his one and only Son.", reference: "John 3:16" },
    { text: "I am the resurrection and the life. Whoever believes in me will live.", reference: "John 11:25" },
    { text: "Peace I leave with you; my peace I give you.", reference: "John 14:27" },
    { text: "I am the light of the world. Whoever follows me will never walk in darkness.", reference: "John 8:12" },
    { text: "Ask and it will be given to you; seek and you will find.", reference: "Matthew 7:7" },
]

function JesusQuote() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % quotes.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-2xl mx-auto px-8 mt-8"
        >
            <div className="p-6 rounded-lg bg-white/5 border border-yellow-400/20 text-center relative overflow-hidden">
                
                {/* Decorative cross */}
                <div className="text-2xl mb-3 opacity-40">✝</div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-gray-200 text-xl mb-3"
                           style={{fontFamily: 'Crimson Text, serif', fontStyle: 'italic', lineHeight: '1.8'}}>
                            "{quotes[index].text}"
                        </p>
                        <p className="text-yellow-400/70 text-sm"
                           style={{fontFamily: 'Cinzel, serif'}}>
                            — {quotes[index].reference}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4">
                    {quotes.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                            style={{
                                background: i === index ? '#f0d060' : 'rgba(255,255,255,0.2)'
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default JesusQuote