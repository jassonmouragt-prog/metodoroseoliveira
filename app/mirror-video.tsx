"use client";

import { useEffect, useRef } from "react";

export function MirrorVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        video.pause();
      } else if (!motion.matches && video.muted) {
        void video.play().catch(() => { /* Manual controls remain available. */ });
      }
    }, { threshold: 0.35 });

    const stopForReducedMotion = () => { if (motion.matches) video.pause(); };
    motion.addEventListener("change", stopForReducedMotion);
    observer.observe(video);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", stopForReducedMotion);
      video.pause();
    };
  }, []);

  return <div className="mirror-media">
    <video ref={videoRef} controls muted loop playsInline preload="none" poster="/video-rose-poster.jpg" width="540" height="960" aria-label="Vídeo de Rose Oliveira com uma cliente no salão">
      <source src="/video-rose-leve.mp4" type="video/mp4" />
      Seu navegador não suporta a reprodução deste vídeo.
    </video>
  </div>;
}
