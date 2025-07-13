import React, { useRef, useEffect } from "react";

const SpiderWeb = () => {
  const canvasRef = useRef(null);
  const particles = [];
  const maxDistance = 100;
  const numParticles = 100;
  const radiusAroundMouse = 150;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    function Particle() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = 2;

      this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      };

      this.update = () => {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.draw();
      };
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    function drawLine(x1, y1, x2, y2, dist) {
      const opacity = 1 - dist / maxDistance;
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const visibleParticles = particles.filter(
        (p) =>
          Math.abs(p.x - mouse.x) < radiusAroundMouse &&
          Math.abs(p.y - mouse.y) < radiusAroundMouse
      );

      visibleParticles.forEach((p, i) => {
        p.update();

        for (let j = i + 1; j < visibleParticles.length; j++) {
          const dx = p.x - visibleParticles[j].x;
          const dy = p.y - visibleParticles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            drawLine(p.x, p.y, visibleParticles[j].x, visibleParticles[j].y, dist);
          }
        }

      
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          drawLine(p.x, p.y, mouse.x, mouse.y, dist);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        background: "#0d0d0d",
        pointerEvents: "none",
      }}
    />
  );
};

export default SpiderWeb;
