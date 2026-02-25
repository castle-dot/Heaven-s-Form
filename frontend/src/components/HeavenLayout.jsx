import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import audio1 from '../assets/audio1.MP3'

function HeavenLayout({ children }) {
    const canvasRef = useRef(null)
    const audioRef = useRef(null)
    const [muted, setMuted] = useState(true)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const stars = Array.from({ length: 150 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
        }))

        let animationId
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            stars.forEach(star => {
                star.opacity += star.speed
                if (star.opacity > 1 || star.opacity < 0) star.speed *= -1
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 215, 100, ${star.opacity})`
                ctx.fill()
            })
            animationId = requestAnimationFrame(animate)
        }
        animate()

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const toggleAudio = () => {
        const audio = audioRef.current
        if (muted) {
            audio.play()
            audio.volume = 0.3
            setMuted(false)
        } else {
            audio.pause()
            setMuted(true)
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
             style={{
                 backgroundImage: 'url(https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
             }}>

            {/* Audio */}
            <audio ref={audioRef} loop>
                <source src={audio1} type="audio/mp3" />
            </audio>

            {/* Mute/Unmute button */}
            <motion.button
                onClick={toggleAudio}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(240, 208, 96, 0.3)',
                    zIndex: 100,
                    backdropFilter: 'blur(10px)'
                }}
            >
                {muted ? '🔇' : '🔊'}
            </motion.button>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Navbar */}
            <div style={{zIndex: 50, position: 'relative'}}>
                <Navbar />
            </div>

            {/* Twinkling stars canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{zIndex: 1}} />

            {/* Clouds */}
<div className="cloud cloud-1">
    <div className="cloud-body" style={{width: '120px', height: '40px'}}>
        <div style={{position: 'absolute', top: '-20px', left: '20px', width: '50px', height: '50px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
        <div style={{position: 'absolute', top: '-30px', left: '50px', width: '70px', height: '70px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
        <div style={{position: 'absolute', top: '-15px', left: '90px', width: '40px', height: '40px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
    </div>
</div>
<div className="cloud cloud-2">
    <div className="cloud-body" style={{width: '180px', height: '50px'}}>
        <div style={{position: 'absolute', top: '-25px', left: '30px', width: '60px', height: '60px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
        <div style={{position: 'absolute', top: '-40px', left: '70px', width: '90px', height: '90px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
        <div style={{position: 'absolute', top: '-20px', left: '140px', width: '50px', height: '50px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
    </div>
</div>
<div className="cloud cloud-3">
    <div className="cloud-body" style={{width: '100px', height: '35px'}}>
        <div style={{position: 'absolute', top: '-18px', left: '15px', width: '45px', height: '45px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
        <div style={{position: 'absolute', top: '-25px', left: '40px', width: '55px', height: '55px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
    </div>
</div>
<div className="cloud cloud-4">
    <div className="cloud-body" style={{width: '150px', height: '45px'}}>
        <div style={{position: 'absolute', top: '-20px', left: '25px', width: '55px', height: '55px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
        <div style={{position: 'absolute', top: '-35px', left: '60px', width: '75px', height: '75px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
        <div style={{position: 'absolute', top: '-18px', left: '115px', width: '45px', height: '45px', background: 'rgba(255,240,180,0.5)', borderRadius: '50%'}}></div>
    </div>
</div>

            {/* Page content */}
            <motion.div
                className="relative w-full"
                style={{zIndex: 2}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default HeavenLayout