"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import methodLogo from "../public/logo-metodo-header.webp";

const links = [
  ["O Método", "#metodo"], ["Para quem é", "#para-quem"],
  ["O que você aprende", "#aprendizado"], ["Rose Oliveira", "#rose"], ["Dúvidas", "#duvidas"],
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
    <div className="header-inner">
      <a href="#inicio" className="wordmark" aria-label="Método Rose Oliveira — início"><Image src={methodLogo} alt="Método Rose Oliveira" sizes="(max-width: 800px) 150px, 195px" loading="eager" unoptimized /></a>
      <nav id="primary-navigation" className="nav-links" aria-label="Navegação principal">
        {links.map(([name, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{name}</a>)}
        <a className="mobile-nav-cta" href="#oferta" onClick={() => setOpen(false)}>Quero conhecer o método <span aria-hidden="true">↗</span></a>
      </nav>
      <a className="header-cta" href="#oferta">Conhecer o método <span aria-hidden="true">↗</span></a>
      <button className="menu-toggle" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><span/><span/></button>
    </div>
  </header>;
}

export function MethodSteps() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-method-step]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.methodStep)); });
    }, { rootMargin: "-30% 0px -45% 0px" });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const items = ["Atender", "Entender", "Planejar", "Executar", "Finalizar", "Valorizar"];
  return <div className="method-steps" aria-label="Etapas do método">
    {items.map((item, index) => <div className={`method-step ${active === index ? "active" : ""}`} data-method-step={index} key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i aria-hidden="true">↗</i></div>)}
  </div>;
}

export function PageMotion() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll<HTMLElement>("main section:not(.hero) h2, .learning-item, .compare li, .mentor-photo, .mirror-photo, .offer-art, .comparison-pair");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
    elements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach(element => element.classList.remove("reveal-pending"));
    };
  }, []);
  return null;
}
