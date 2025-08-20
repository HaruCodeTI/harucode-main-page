import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface BeamsProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
  beamCount?: number;
}

const Beams = ({ 
  children, 
  className, 
  intensity = 0.6, 
  speed = 0.5,
  beamCount = 3
}: BeamsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const animate = () => {
      time += 0.01;
      
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create multiple beams
      for (let i = 0; i < beamCount; i++) {
        const offset = (i / beamCount) * Math.PI * 2;
        const x = width * 0.5 + Math.sin(time * speed + offset) * width * 0.4;
        const y = height * 0.5 + Math.cos(time * speed + offset) * height * 0.4;

        // Create beam gradient
        const gradient = ctx.createLinearGradient(
          x - width * 0.3,
          y - height * 0.3,
          x + width * 0.3,
          y + height * 0.3
        );

        gradient.addColorStop(0, `rgba(147, 51, 234, 0)`);
        gradient.addColorStop(0.1, `rgba(147, 51, 234, ${intensity * 0.3})`);
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${intensity})`);
        gradient.addColorStop(0.9, `rgba(147, 51, 234, ${intensity * 0.3})`);
        gradient.addColorStop(1, `rgba(147, 51, 234, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add radial glow at beam center
        const radialGradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, Math.max(width, height) * 0.2
        );

        radialGradient.addColorStop(0, `rgba(147, 51, 234, ${intensity * 0.5})`);
        radialGradient.addColorStop(0.5, `rgba(147, 51, 234, ${intensity * 0.2})`);
        radialGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');

        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity, speed, beamCount]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default Beams;
