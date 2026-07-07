import { useCallback, useEffect, useRef, useState } from "react";
import useKonami from "../hooks/useKonami";
import Terminal from "./Terminal";

/* a sparse drift of champagne-gold leaves — celebration, whispered */
const COLORS = ["#c6a15b", "#9c7a4d", "#59563f", "#b8a98c"];

function goldDrift(canvas, duration = 4500) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 42 }, () => ({
    x: Math.random() * canvas.width,
    y: -30 - Math.random() * canvas.height * 0.4,
    r: 1.5 + Math.random() * 2.5,
    vy: 0.6 + Math.random() * 1.1,
    drift: Math.random() * Math.PI * 2,
    driftSpeed: 0.008 + Math.random() * 0.012,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 0.5 + Math.random() * 0.5,
  }));

  const start = performance.now();
  let frame;

  const tick = (now) => {
    const elapsed = now - start;
    const fade = elapsed > duration - 1200 ? (duration - elapsed) / 1200 : 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.drift += p.driftSpeed;
      p.x += Math.sin(p.drift) * 0.7;
      p.y += p.vy;
      ctx.globalAlpha = Math.max(p.alpha * fade, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (elapsed < duration) {
      frame = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

export default function Toys() {
  const canvasRef = useRef(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  const celebrate = useCallback(() => {
    if (canvasRef.current) goldDrift(canvasRef.current);
    showToast("Noted. You know the old ways.");
  }, [showToast]);

  useKonami(celebrate);

  const onTerminalFirstOpen = useCallback(() => {
    showToast("Ah — a fellow keyboard person.");
  }, [showToast]);

  useEffect(() => {
    /* eslint-disable no-console */
    console.log(
      "%cDarshan Maniar — Heilbronn",
      "font-family: Georgia, serif; font-style: italic; font-size: 16px; color: #59563f;"
    );
    console.log(
      "%cThe CV you can download here is compiled from LaTeX by CI on every push — it is never stale. Curious about the rest? drshnmaniar@gmail.com\n\nTry ~ on the keyboard. Or the old code, if you remember it.",
      "font-size: 12px; color: #9c7a4d;"
    );
    /* eslint-enable no-console */
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
      <Terminal onFirstOpen={onTerminalFirstOpen} />
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
