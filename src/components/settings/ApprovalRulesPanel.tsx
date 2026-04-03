export function ApprovalRulesPanel() {
  return (
    <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm uppercase tracking-[0.18em] text-slate-500">Approval rules</h3>
      <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
        <span className="text-slate-700">Auto-route score &gt; 8 to lead editor</span>
        <input type="checkbox" defaultChecked className="h-4 w-4" />
      </label>
      <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
        <span className="text-slate-700">Require risk review before approval</span>
        <input type="checkbox" defaultChecked className="h-4 w-4" />
      </label>
    </section>
  );
}
