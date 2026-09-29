// Populate only from verified brand material. Empty collections never render on the public page.
type VerifiedContent = {
  authority: { value: string; label: string }[];
  testimonials: { quote: string; person: string; source?: string }[];
  guarantee?: { period: string; terms: string };
};
const verified: VerifiedContent = { authority: [], testimonials: [] };

export function VerifiedAuthority() {
  if (!verified.authority.length) return null;
  return <section className="verified-section wrap" aria-label="Números verificados">{verified.authority.map(item => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</section>;
}

export function VerifiedTestimonials() {
  if (!verified.testimonials.length) return null;
  return <section className="verified-section wrap" aria-label="Depoimentos de alunas"><h2>Quando a transformação chega à profissional, ela chega também às clientes.</h2>{verified.testimonials.map(item => <blockquote key={item.person + item.quote}><p>“{item.quote}”</p><footer>{item.person}{item.source ? ` · ${item.source}` : ""}</footer></blockquote>)}</section>;
}

export function VerifiedGuarantee() {
  if (!verified.guarantee) return null;
  return <section className="verified-section wrap"><h2>Sua decisão também precisa ser segura.</h2><p>{verified.guarantee.period} · {verified.guarantee.terms}</p></section>;
}
