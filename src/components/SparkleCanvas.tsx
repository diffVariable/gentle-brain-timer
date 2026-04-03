import { useEffect, useRef } from "react";

const SparkleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const sparkles = Array.from({ length: 24 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: 4 + Math.random() * 10,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.8,
    }));

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      sparkles.forEach((s) => {
        s.x = Math.random() * canvas.width;
        s.y = Math.random() * canvas.height;
      });
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparkles.forEach((s) => {
        s.phase += s.speed * 0.03;
        const alpha = Math.max(0, (Math.sin(s.phase) + 1) / 2) * 0.8;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = "#e8789a";
        ctx.lineWidth = 1.5;
        ctx.translate(s.x, s.y);
        const r = s.size;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(0, r);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-r, 0);
        ctx.lineTo(r, 0);
        ctx.stroke();
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.6);
        ctx.lineTo(0, r * 0.6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-r * 0.6, 0);
        ctx.lineTo(r * 0.6, 0);
        ctx.stroke();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default SparkleCanvas;
