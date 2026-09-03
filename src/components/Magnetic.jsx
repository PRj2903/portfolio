import React, { useRef, useState, useEffect } from 'react';

const Magnetic = ({
  children,
  strength = 25, // Max displacement in px
  radius = 120,   // Active radius in px
  className = '',
  style = {},
  ...props
}) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < radius) {
        setIsHovering(true);
        // Normalized displacement scaled by strength
        const factor = (radius - distance) / radius;
        setOffset({
          x: (distX / radius) * strength * factor * 1.5,
          y: (distY / radius) * strength * factor * 1.5,
        });
      } else if (isHovering) {
        setIsHovering(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [radius, strength, isHovering]);

  return (
    <div
      ref={ref}
      className={`magnetic-wrapper ${className}`}
      style={{
        display: 'inline-block',
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovering ? 'transform 0.15s ease-out' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Magnetic;
