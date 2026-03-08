import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FloatingShape = ({ initialX, initialY, size, color, duration, rotationSpeed, delay }) => {
    const { scrollY } = useScroll();
    const yTransform = useTransform(scrollY, [0, 2000], [0, -400 * (size / 100)]);
    const rotateTransform = useTransform(scrollY, [0, 2000], [0, 360 * rotationSpeed]);

    return (
        <motion.div
            style={{
                x: initialX,
                y: yTransform,
                rotate: rotateTransform,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1, delay }}
            className="absolute pointer-events-none"
        >
            <div
                style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
                className="blur-[2px] shadow-[0_0_30px_rgba(0,255,157,0.3)] opacity-20"
            />
        </motion.div>
    );
};

const ParallaxBackground = () => {
    const { scrollY } = useScroll();

    // Smooth color fields orchestration
    const glowY1 = useTransform(scrollY, [0, 1000], [0, -200]);
    const glowY2 = useTransform(scrollY, [0, 1000], [0, -400]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ambient Glow Fields */}
            <motion.div style={{ y: glowY1 }} className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[150px] opacity-40 mix-blend-screen" />
            <motion.div style={{ y: glowY2 }} className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[180px] opacity-30 mix-blend-screen" />

            {/* Premium 3D Shapes */}
            <FloatingShape initialX="10%" initialY="20%" size={120} color="var(--accent-primary)" duration={20} rotationSpeed={1.5} delay={0.2} />
            <FloatingShape initialX="80%" initialY="15%" size={180} color="var(--accent-primary)" duration={25} rotationSpeed={-1} delay={0.5} />
            <FloatingShape initialX="45%" initialY="60%" size={90} color="var(--accent-primary)" duration={18} rotationSpeed={2} delay={0.8} />
            <FloatingShape initialX="15%" initialY="85%" size={150} color="var(--accent-primary)" duration={30} rotationSpeed={0.5} delay={1.1} />

            {/* Kinetic Scan Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

            {/* Subtle light rays */}
            <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent"
            />
        </div>
    );
};

export default ParallaxBackground;
