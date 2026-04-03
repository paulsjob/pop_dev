export function OutputTriggersPanel() {
  return (
    <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm uppercase tracking-[0.18em] text-slate-500">Output trigger rules</h3>
      <div className="rounded-2xl border border-slate-200 p-4 text-slate-700">
        Generate "Policy Explainer" when score ≥ 7 and confidence ≥ 75%.
      </div>
      <div className="rounded-2xl border border-slate-200 p-4 text-slate-700">
        Generate "Leadership Brief" when urgency is high and recommendation is strong or must-act.
      </div>
    </section>
  );
}
