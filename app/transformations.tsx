"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Transformation = {
  id: string;
  before?: string;
  after?: string;
  description?: string;
};

const transformations: Transformation[] = [
  { id: "01", before: "/transformacoes/antes-01.webp", after: "/transformacoes/depois-01.webp" },
  { id: "02", before: "/transformacoes/antes-02.webp", after: "/transformacoes/depois-02.webp" },
  { id: "03", before: "/transformacoes/antes-03.webp", after: "/transformacoes/depois-03.webp" },
  { id: "04", before: "/transformacoes/antes-04.webp", after: "/transformacoes/depois-04.webp" },
];

function ComparisonImage({ src, phase, id, description, priority }: { src?: string; phase: "Antes" | "Depois"; id: string; description?: string; priority: boolean }) {
  return <div className="comparison-image">
    {src ? <Image src={src} alt={`${phase} da transformação real ${id}${description ? `: ${description}` : ""}`} fill sizes="(max-width: 600px) 45vw, (max-width: 1024px) 43vw, 34vw" priority={priority} /> : <div className="comparison-placeholder" role="img" aria-label={`Espaço reservado para foto real do ${phase.toLowerCase()} ${id}`}><span>FOTOGRAFIA REAL<br />{phase.toUpperCase()} {id}</span><small>Inserir imagem autorizada</small></div>}
    <span className="comparison-tag">{phase}</span>
  </div>;
}

export function TransformationCarousel() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const current = transformations[index];
  const move = (direction: number) => setIndex(previous => (previous + direction + transformations.length) % transformations.length);

  return <div className="transformation-carousel" role="region" aria-roledescription="carrossel" aria-label="Antes e depois" tabIndex={0} onKeyDown={event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
  }}>
    <div className="carousel-meta"><span>ANTES & DEPOIS</span><span aria-live="polite">{String(index + 1).padStart(2, "0")} <i>/</i> {String(transformations.length).padStart(2, "0")}</span></div>
    <div className="comparison-pair" data-case={current.id} onTouchStart={event => { startX.current = event.touches[0].clientX; }} onTouchEnd={event => {
      if (startX.current === null) return;
      const distance = event.changedTouches[0].clientX - startX.current;
      if (Math.abs(distance) > 55) move(distance < 0 ? 1 : -1);
      startX.current = null;
    }} onTouchCancel={() => { startX.current = null; }}>
      <ComparisonImage src={current.before} phase="Antes" id={current.id} description={current.description} priority={false} />
      <ComparisonImage src={current.after} phase="Depois" id={current.id} description={current.description} priority={false} />
    </div>
    <div className="carousel-bottom"><p>{current.before && current.after ? current.description || "Transformação real da Rose Oliveira." : "Espaço reservado para fotos reais do mesmo atendimento. Deslize para ver os próximos pares."}</p><div className="carousel-controls"><button type="button" aria-label="Ver transformação anterior" onClick={() => move(-1)}>←</button><div className="carousel-dots" aria-label="Selecionar transformação">{transformations.map((item, position) => <button key={item.id} type="button" aria-label={`Ver par ${position + 1}`} aria-current={index === position ? "true" : undefined} onClick={() => setIndex(position)} />)}</div><button type="button" aria-label="Ver próxima transformação" onClick={() => move(1)}>→</button></div></div>
  </div>;
}
