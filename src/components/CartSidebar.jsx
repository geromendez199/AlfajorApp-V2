import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext.jsx';

const currency = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export default function CartSidebar() {
  const { cart, total, removeItem, sendOrder } = useContext(OrderContext);

  return (
    <aside className="sticky top-6 h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Carrito</p>
          <h2 className="text-xl font-bold text-slate-900">Pedido actual</h2>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {cart.length} ítems
        </span>
      </div>

      {!cart.length ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-slate-500">
          <p className="text-sm font-medium">Esperando pedido...</p>
          <p className="text-xs text-slate-400">Agrega productos para cobrar</p>
        </div>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y divide-slate-100">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    {item.quantity || 1} x {currency.format(item.price)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900">
                    {currency.format(item.price * (item.quantity || 1))}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-200"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">Total</p>
            <p className="text-2xl font-bold">{currency.format(total)}</p>
          </div>

          <button
            type="button"
            onClick={sendOrder}
            className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 active:scale-[0.99]"
          >
            COBRAR
          </button>
        </div>
      )}
    </aside>
  );
}
