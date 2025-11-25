import React from 'react';
import { OrderProvider } from './context/OrderContext.jsx';

function App() {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-slate-50 text-slate-900">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-amber-600">AlfajorApp V2</p>
              <h1 className="text-3xl font-bold text-slate-900">Sistema POS & KDS</h1>
              <p className="mt-2 text-sm text-slate-600">
                Configura Tailwind y dependencias antes de continuar con el desarrollo.
              </p>
            </div>
            <div className="rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase text-slate-500">Estado</p>
              <p className="text-sm font-medium text-emerald-600">Setup inicial listo</p>
            </div>
          </header>

          <main className="grid gap-6 rounded-2xl bg-white/70 p-8 shadow-lg ring-1 ring-slate-100 backdrop-blur">
            <div className="space-y-3">
              <p className="text-lg font-semibold text-slate-900">Próximos pasos</p>
              <ul className="list-disc space-y-2 pl-5 text-slate-700">
                <li>Instala dependencias con el comando proporcionado.</li>
                <li>Configura Firebase en <code className="rounded bg-slate-100 px-1 py-0.5">src/firebase/config.js</code>.</li>
                <li>Implementa la lógica POS, KDS y Admin según las especificaciones.</li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </OrderProvider>
  );
}

export default App;
