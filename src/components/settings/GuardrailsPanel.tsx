export function GuardrailsPanel() {
  return (
    <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm uppercase tracking-[0.18em] text-slate-500">Editorial guardrails</h3>
      <textarea
        className="min-h-28 w-full rounded-2xl border border-slate-200 p-4 text-base text-slate-700 outline-none"
        defaultValue="Avoid unverified claims. Prioritize public-interest framing. Surface conflicts and sourcing gaps explicitly."
      />
    </section>
  );
}
