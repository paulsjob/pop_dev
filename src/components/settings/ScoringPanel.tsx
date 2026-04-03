const weights = [
  'Urgency',
  'Clarity',
  'Audience resonance',
  'Emotional charge',
  'Strategic fit',
];

export function ScoringPanel() {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm uppercase tracking-[0.18em] text-slate-500">Scoring weights</h3>
      {weights.map((weight) => (
        <label key={weight} className="block space-y-1">
          <span className="text-sm text-slate-600">{weight}</span>
          <input type="range" min="0" max="10" defaultValue="7" className="w-full accent-slate-700" />
        </label>
      ))}
    </section>
  );
}
