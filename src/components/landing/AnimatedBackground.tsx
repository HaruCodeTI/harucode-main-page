import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  gradientColors?: [string, string, string];
  particleColor?: string;
  children?: React.ReactNode;
  intensity?: number;
}

const AnimatedBackground = ({
  className,
  gradientColors = ['rgba(124,58,237,0.35)', 'rgba(59,7,100,0.5)', 'rgba(10,12,32,0.95)'],
  particleColor = 'rgba(255,255,255,0.55)',
  children,
  intensity = 0.45
}: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(circle at ${x}% ${y}%, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let resizeTimeout: number;

    const particles = Array.from({ length: Math.floor(80 * intensity) }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      radius: Math.random() * 1.4 + 0.4
    }));

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const render = () => {
      if (!canvas) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
        if (particle.y < 0 || particle.y > 1) particle.vy *= -1;

        const px = particle.x * width;
        const py = particle.y * height;
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, particle.radius * 10);
        gradient.addColorStop(0, particleColor);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, particle.radius * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();

    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity, particleColor]);

  useEffect(() => {
    const update = () => {
      const time = performance.now() / 6000;
      x.set(50 + Math.sin(time) * 20);
      y.set(50 + Math.cos(time) * 20);
      requestAnimationFrame(update);
    };
    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [x, y]);

  return (
    <motion.div style={{ background }} className={cn('relative overflow-hidden', className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default AnimatedBackground;

