import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const requestRef = useRef();
  const trailRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Event delegation to check if mouse is over interactive item
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.btn') || 
        target.closest('.spotlight-card') || 
        target.closest('.skill-card') ||
        target.closest('.social-link') ||
        target.closest('.nav-link') ||
        target.style.cursor === 'pointer';
        
      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Smooth trail animation loop (LERP: Linear Interpolation)
  useEffect(() => {
    const updateTrail = () => {
      const targetX = position.x;
      const targetY = position.y;
      
      // Interpolation factor: 0.15 for smooth lag
      const ease = 0.15;
      
      const nextX = trailRef.current.x + (targetX - trailRef.current.x) * ease;
      const nextY = trailRef.current.y + (targetY - trailRef.current.y) * ease;
      
      trailRef.current = { x: nextX, y: nextY };
      setTrail({ x: nextX, y: nextY });
      
      requestRef.current = requestAnimationFrame(updateTrail);
    };
    
    requestRef.current = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(requestRef.current);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '50px' : '30px',
          height: isHovered ? '50px' : '30px',
          borderRadius: '50%',
          border: `1.5px solid ${isHovered ? 'var(--accent-gold)' : 'var(--accent-primary)'}`,
          transform: `translate3d(${trail.x - (isHovered ? 25 : 15)}px, ${trail.y - (isHovered ? 25 : 15)}px, 0) scale(${isClicking ? 0.8 : 1})`,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, transform 0.05s ease-out',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: isHovered ? '0 0 15px rgba(245, 158, 11, 0.4)' : 'none',
          backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
        }}
      />
      {/* Inner Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isHovered ? 'var(--accent-gold)' : 'var(--accent-primary)',
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'background-color 0.3s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
