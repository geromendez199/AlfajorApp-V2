import React from 'react';
import * as api from '../firebase/api';

const statusStyles = {
  pending: 'border-amber-300 bg-amber-50',
  ready: 'border-emerald-300 bg-emerald-50',
};

export default function KitchenTicket({ order }) {
  if (!order) return null;

  const handleAdvance = () => {
    const nextStatus = order.status === 'pending' ? 'ready' : 'pending';
    api.updateOrderStatus(order.id, nextStatus);
  };

  const createdAt = order.createdAt?.toDate?.() ?? new Date();

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border p-5 shadow-sm transition ${
        statusStyles[order.status] || 'border-slate-200 bg-white'
      }`}
    >
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Pedido</p>
          <h3 className="text-lg font-bold text-slate-900">#{order.id}</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">{createdAt.toLocaleDateString()}</p>
          <p className="text-sm font-semibold text-slate-900">
            {createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </header>

      <ul className="space-y-2">
        {order.items?.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2 text-sm text-slate-800"
          >
            <span className="font-semibold">{item.name}</span>
            <span className="text-slate-600">x {item.quantity || 1}</span>
          </li>
        ))}
      </ul>

      <footer className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
            order.status === 'pending'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {order.status === 'pending' ? 'Pendiente' : 'Listo'}
        </span>
        <button
          type="button"
          onClick={handleAdvance}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
        >
          Avanzar Estado
        </button>
      </footer>
    </article>
  );
}
