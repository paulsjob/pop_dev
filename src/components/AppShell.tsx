import { ReactNode } from 'react';

interface AppShellProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  status: string;
}

export function AppShell({ left, center, right, status }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 px-3 py-3 text-slate-100 lg:px-4">
      <div className="mx-auto w-full max-w-[1500px]">
        <header className="mb-3 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5">
          <div>
            <h1 className="text-lg font-semibold">MD Editorial Engine</h1>
            <p className="text-xs text-slate-400">Leadership editorial decision console</p>
          </div>
          <div className="max-w-sm text-right text-xs text-slate-400">{status}</div>
        </header>

        <main className="grid gap-3 lg:grid-cols-[1.05fr_1fr_1fr]">
          <section>{left}</section>
          <section>{center}</section>
          <section>{right}</section>
        </main>
      </div>
    </div>
  );
}
