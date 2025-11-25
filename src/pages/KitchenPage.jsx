import React, { useEffect, useMemo, useState } from 'react';
import KitchenTicket from '../components/KitchenTicket.jsx';
import { subscribeToOrders } from '../firebase/api';

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = subscribeToOrders(setOrders);
    return () => unsubscribe?.();
  }, []);

  const filteredOrders = useMemo(() => {
    if (filter === 'pending') return orders.filter((order) => order.status === 'pending');
    if (filter === 'ready') return orders.filter((order) => order.status === 'ready');
    return orders;
  }, [filter, orders]);

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Cocina</p>
            <h1 className="text-3xl font-bold">Panel de preparación</h1>
            <p className="text-sm text-slate-200">Actualización en tiempo real de pedidos.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/5 p-1">
            {[
              { key: 'all', label: 'Todos' },
              { key: 'pending', label: 'Pendientes' },
              { key: 'ready', label: 'Listos' },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setFilter(option.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === option.key
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredOrders.map((order) => (
            <KitchenTicket key={order.id} order={order} />
          ))}
        </section>

        {!filteredOrders.length && (
          <div className="mt-10 rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-slate-200">
            <p className="text-lg font-semibold">No hay pedidos en esta vista</p>
            <p className="text-sm text-slate-300">Los nuevos pedidos aparecerán aquí automáticamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}
