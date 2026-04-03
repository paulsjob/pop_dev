interface ProcessingScreenProps {
  steps: string[];
  activeStepIndex: number;
}

export function ProcessingScreen({ steps, activeStepIndex }: ProcessingScreenProps) {
  return (
    <section className="mx-auto flex min-h-[82vh] w-full max-w-3xl flex-col justify-center gap-8">
      <h2 className="text-3xl text-slate-800">Analyzing your story</h2>
      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {steps.map((step, index) => {
          const isDone = index <= activeStepIndex;
          return (
            <div key={step} className="flex items-center gap-3 text-lg">
              <span
                className={`h-2.5 w-2.5 rounded-full transition ${
                  isDone ? 'bg-sky-500 shadow-[0_0_0_6px_rgba(14,165,233,0.12)]' : 'bg-slate-200'
                }`}
              />
              <span className={isDone ? 'text-slate-800' : 'text-slate-400'}>{step}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
