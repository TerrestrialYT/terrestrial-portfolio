import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      vx: 0,
      vy: 0,
      radius: 200
    };

    let lastMouseX: number | null = null;
    let lastMouseY: number | null = null;

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      opacity: number;
      canvasWidth: number;
      canvasHeight: number;
      twinkleSpeed: number;
      twinkleDir: number;
      color: string;

      constructor(w: number, h: number) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        
        // Varying sizes for depth
        this.size = Math.random() * 2 + 0.2;
        
        // Reduced base drift speed for a more subtle look
        this.baseVx = (Math.random() - 0.5) * 0.12;
        this.baseVy = (Math.random() - 0.5) * 0.12;
        
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        
        this.opacity = Math.random() * 0.5 + 0.1;
        this.twinkleSpeed = Math.random() * 0.005 + 0.002;
        this.twinkleDir = 1;
        
        // Occasional accent colored particles
        this.color = Math.random() > 0.95 ? 'rgba(255, 215, 0,' : 'rgba(255, 255, 255,';
      }

      update() {
        // Friction for smoother return to base speed
        this.vx += (this.baseVx - this.vx) * 0.03;
        this.vy += (this.baseVy - this.vy) * 0.03;

        // Interaction with mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distanceSq = dx * dx + dy * dy;
          const radiusSq = mouse.radius * mouse.radius;
          
          if (distanceSq < radiusSq) {
            const distance = Math.sqrt(distanceSq);
            const force = (mouse.radius - distance) / mouse.radius;
            
            const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
            // Repel if mouse moves fast, pull if it stays still
            const interactionType = mouseSpeed > 1.5 ? -1.2 : 0.4;
            
            this.vx += (dx / distance) * force * interactionType * 0.6;
            this.vy += (dy / distance) * force * interactionType * 0.6;
            
            // Mouse velocity influence
            this.vx += mouse.vx * force * 0.1;
            this.vy += mouse.vy * force * 0.1;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around logic
        if (this.x > this.canvasWidth) this.x = 0;
        else if (this.x < 0) this.x = this.canvasWidth;
        if (this.y > this.canvasHeight) this.y = 0;
        else if (this.y < 0) this.y = this.canvasHeight;

        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDir;
        if (this.opacity > 0.8 || this.opacity < 0.1) {
          this.twinkleDir *= -1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a subtle glow to larger particles
        if (this.size > 1.2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color.includes('215') ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)';
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const drawLines = () => {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSq = dx * dx + dy * dy;
          
          if (distanceSq < maxDistance * maxDistance) {
            const distance = Math.sqrt(distanceSq);
            const opacity = 1 - (distance / maxDistance);
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const init = () => {
      if (!canvas) return;
      particles = [];
      // Adjusted density for lines logic
      const density = window.innerWidth < 768 ? 8000 : 10000;
      const numberOfParticles = (canvas.width * canvas.height) / density;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0; // Reset shadow for lines
      drawLines();
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseX !== null && lastMouseY !== null) {
        mouse.vx = e.clientX - lastMouseX;
        mouse.vy = e.clientY - lastMouseY;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      
      // Decay velocity so stays responsive
      setTimeout(() => {
        mouse.vx *= 0.5;
        mouse.vy *= 0.5;
      }, 50);
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};
