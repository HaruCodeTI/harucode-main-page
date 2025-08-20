import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DarkVeilProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
}

const DarkVeil = ({ 
  children, 
  className, 
  intensity = 0.3, 
  speed = 20 
}: DarkVeilProps) => {
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

      // Create gradient
      const gradient = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * speed) * width * 0.3,
        height * 0.5 + Math.cos(time * speed) * height * 0.3,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );

      gradient.addColorStop(0, `rgba(0, 0, 0, ${intensity})`);
      gradient.addColorStop(0.5, `rgba(0, 0, 0, ${intensity * 0.5})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

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
  }, [intensity, speed]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default DarkVeil;
