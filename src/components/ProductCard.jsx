import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext.jsx';

const currency = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export default function ProductCard({ product }) {
  const { addItem } = useContext(OrderContext);

  if (!product) return null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-video w-full bg-gradient-to-br from-amber-50 via-white to-slate-50">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-amber-600">{product.category || 'Producto'}</p>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">{currency.format(product.price)}</span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
          >
            Agregar
            <span aria-hidden className="text-lg leading-none">＋</span>
          </button>
        </div>
      </div>
    </div>
  );
}
