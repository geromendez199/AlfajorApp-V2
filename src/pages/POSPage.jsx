import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartSidebar from '../components/CartSidebar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { getProducts } from '../firebase/api';

export default function POSPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Punto de Venta</p>
            <h1 className="text-3xl font-bold">Ordena rápido y cobra al instante</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="rounded-lg px-3 py-2 text-xs font-semibold text-amber-700 transition hover:text-amber-600"
            >
              Ir a Admin
            </Link>
            <div className="rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase text-slate-500">Estado</p>
              <p className="text-sm font-medium text-emerald-600">Conectado</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>

          <CartSidebar />
        </div>
      </div>
    </div>
  );
}
