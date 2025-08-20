import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'down' | 'left' | 'right';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

const Squares = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 90,
  hoverFillColor = '#222',
  className = ''
}: SquaresProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      numSquaresX.current = Math.ceil(canvas.width / squareSize);
      numSquaresY.current = Math.ceil(canvas.height / squareSize);
    };

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update grid offset based on direction
      const speedMultiplier = speed * 2;
      switch (direction) {
        case 'right':
          gridOffset.current.x += speedMultiplier;
          break;
        case 'left':
          gridOffset.current.x -= speedMultiplier;
          break;
        case 'down':
          gridOffset.current.y += speedMultiplier;
          break;
        case 'up':
          gridOffset.current.y -= speedMultiplier;
          break;
        case 'diagonal':
          gridOffset.current.x += speedMultiplier;
          gridOffset.current.y += speedMultiplier;
          break;
      }

      // Reset offset when it exceeds square size
      if (Math.abs(gridOffset.current.x) >= squareSize) {
        gridOffset.current.x = 0;
      }
      if (Math.abs(gridOffset.current.y) >= squareSize) {
        gridOffset.current.y = 0;
      }

      // Draw squares
      for (let x = 0; x <= numSquaresX.current; x++) {
        for (let y = 0; y <= numSquaresY.current; y++) {
          const squareX = x * squareSize - gridOffset.current.x;
          const squareY = y * squareSize - gridOffset.current.y;

          // Check if mouse is hovering over this square
          const isHovered = hoveredSquare.current && 
            hoveredSquare.current.x === x && 
            hoveredSquare.current.y === y;

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);

          if (isHovered) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const squareX = Math.floor((mouseX + gridOffset.current.x) / squareSize);
      const squareY = Math.floor((mouseY + gridOffset.current.y) / squareSize);

      hoveredSquare.current = { x: squareX, y: squareY };
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    resizeCanvas();
    animate();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default Squares;
