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
    <aside className="sticky top-6 h-fit rounded-2xl border border-brand-green/40 bg-brand-cream p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark/70">Carrito</p>
          <h2 className="text-xl font-bold text-brand-green heading-font">Pedido actual</h2>
        </div>
        <span className="rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-brand-cream">
          {cart.length} ítems
        </span>
      </div>

      {!cart.length ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-green/40 bg-white/60 p-6 text-center text-brand-dark/80">
          <p className="text-sm font-medium">Esperando pedido...</p>
          <p className="text-xs text-brand-dark/70">Agrega productos para cobrar</p>
        </div>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y divide-brand-green/20">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-brand-green">{item.name}</p>
                  <p className="text-xs text-brand-dark">
                    {item.quantity || 1} x {currency.format(item.price)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-brand-dark">
                    {currency.format(item.price * (item.quantity || 1))}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-full border border-brand-green/30 bg-white px-3 py-1 text-xs font-semibold text-brand-dark transition hover:bg-brand-cream"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between rounded-xl bg-brand-green px-4 py-3 text-brand-cream">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-cream/90">Total</p>
            <p className="text-2xl font-bold">{currency.format(total)}</p>
          </div>

          <button
            type="button"
            onClick={sendOrder}
            className="w-full rounded-xl bg-brand-green px-4 py-3 text-center text-base font-semibold text-brand-cream shadow-lg shadow-brand-green/30 transition hover:bg-brand-dark active:scale-[0.99]"
          >
            COBRAR
          </button>
        </div>
      )}
    </aside>
  );
}
