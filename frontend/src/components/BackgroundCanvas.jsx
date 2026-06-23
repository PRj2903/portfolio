import React, { useEffect, useRef } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 20000));
    
    const mouse = {
      x: null,
      y: null,
      radius: 220,
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.5;
        this.baseSpeedX = (Math.random() - 0.5) * 0.5;
        this.baseSpeedY = (Math.random() - 0.5) * 0.5;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.hue = Math.random() > 0.6 ? 245 : 38; // Indigo (245) or Gold (38)
        this.opacity = Math.random() * 0.5 + 0.25;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = (Math.random() - 0.5) * 0.01;
      }

      update() {
        // Natural drift
        this.x += this.speedX;
        this.y += this.speedY;

        // Soft boundaries wrapping instead of hard bounce
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        // Interaction with mouse (constellation pull + slow orbit)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            // Draw particles slowly toward the cursor with a slight perpendicular orbital vector
            const angle = Math.atan2(dy, dx);
            
            this.x += Math.cos(angle) * force * 0.8;
            this.y += Math.sin(angle) * force * 0.8;
            
            // Orbit component
            this.x += Math.cos(angle + Math.PI / 2) * force * 0.5;
            this.y += Math.sin(angle + Math.PI / 2) * force * 0.5;
          } else {
            // Smoothly restore base speed
            this.speedX += (this.baseSpeedX - this.speedX) * 0.02;
            this.speedY += (this.baseSpeedY - this.speedY) * 0.02;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 85%, 65%, ${this.opacity})`;
        ctx.fill();
        
        // Add subtle outer glow to larger particles
        if (this.size > 2) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${this.hue}, 85%, 65%, ${this.opacity * 0.2})`;
          ctx.fill();
        }
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            const alpha = ((140 - distance) / 140) * 0.18;
            // Shifting gradient color between nodes
            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const baseColor1 = `hsla(${particles[i].hue}, 80%, ${isDark ? 65 : 45}%, ${alpha})`;
            const baseColor2 = `hsla(${particles[j].hue}, 80%, ${isDark ? 65 : 45}%, ${alpha})`;
            
            grad.addColorStop(0, baseColor1);
            grad.addColorStop(1, baseColor2);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = (140 - distance) / 140 * 1.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw large glowing nebulas in the background
    const drawNebulas = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (!isDark) return; // Only draw beautiful glowing space nebulas in dark mode
      
      const time = Date.now() * 0.0003;
      
      // Orb 1: Violet/Indigo
      const ox1 = width * 0.3 + Math.sin(time) * 100;
      const oy1 = height * 0.4 + Math.cos(time * 0.8) * 100;
      const radGrad1 = ctx.createRadialGradient(ox1, oy1, 50, ox1, oy1, 400);
      radGrad1.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
      radGrad1.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
      radGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = radGrad1;
      ctx.beginPath();
      ctx.arc(ox1, oy1, 400, 0, Math.PI * 2);
      ctx.fill();

      // Orb 2: Amber/Gold
      const ox2 = width * 0.7 + Math.cos(time * 0.9) * 120;
      const oy2 = height * 0.6 + Math.sin(time * 1.1) * 80;
      const radGrad2 = ctx.createRadialGradient(ox2, oy2, 50, ox2, oy2, 350);
      radGrad2.addColorStop(0, 'rgba(245, 158, 11, 0.04)');
      radGrad2.addColorStop(0.5, 'rgba(245, 158, 11, 0.01)');
      radGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = radGrad2;
      ctx.beginPath();
      ctx.arc(ox2, oy2, 350, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      drawNebulas();

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.95,
      }}
    />
  );
};

export default BackgroundCanvas;
