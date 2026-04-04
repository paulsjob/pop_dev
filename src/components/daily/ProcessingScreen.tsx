interface ProcessingScreenProps {
  steps: string[];
  activeStepIndex: number;
}

export function ProcessingScreen({ steps, activeStepIndex }: ProcessingScreenProps) {
  return (
    <section className="mx-auto flex min-h-[84vh] w-full max-w-3xl flex-col justify-center gap-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">In progress</p>
        <h2 className="text-3xl font-medium tracking-[-0.01em] text-stone-800">Analyzing your story</h2>
      </div>
      <div className="space-y-4 rounded-[2rem] border border-stone-200/80 bg-white/90 p-8 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
        {steps.map((step, index) => {
          const isDone = index <= activeStepIndex;
          return (
            <div key={step} className="flex items-center gap-3 text-[1.03rem]">
              <span
                className={`h-2.5 w-2.5 rounded-full transition ${
                  isDone ? 'bg-teal-500 shadow-[0_0_0_8px_rgba(20,184,166,0.12)]' : 'bg-stone-200'
                }`}
              />
              <span className={isDone ? 'text-stone-800' : 'text-stone-400'}>{step}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
