'use client';

import { useEffect, useState } from 'react';

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${15 + Math.random() * 10}s`
    }));
    
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) {
    return null; // Don't render anything during SSR
  }

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration
          }}
        />
      ))}
    </div>
  );
}