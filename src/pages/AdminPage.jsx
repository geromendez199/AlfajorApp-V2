import React, { useEffect, useState } from 'react';
import { addProduct, getProducts } from '../firebase/api';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'comida',
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
    };

    await addProduct(payload);
    setFormData({ name: '', price: '', category: 'comida' });
    alert('Producto guardado correctamente');

    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Administración</p>
            <h1 className="mt-3 text-3xl font-bold">Cargar nuevos productos</h1>
            <p className="mt-1 text-sm text-slate-300">Gestiona el catálogo disponible en el punto de venta.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right shadow-2xl">
            <p className="text-xs font-semibold uppercase text-slate-300">Productos</p>
            <p className="text-lg font-semibold text-amber-200">{products.length}</p>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl"
          >
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-200">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Alfajor de chocolate"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-200">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ej. 1500"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-200">Categoría</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                >
                  <option value="comida">Comida</option>
                  <option value="bebida">Bebida</option>
                  <option value="extra">Extra</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
            >
              Guardar Producto
            </button>
          </form>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-amber-200">Productos actuales</p>
              <span className="text-xs text-slate-400">{products.length} items</span>
            </div>
            <div className="space-y-3">
              {products.length === 0 && (
                <p className="text-sm text-slate-400">No hay productos cargados todavía.</p>
              )}
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{product.name}</p>
                    <p className="text-xs text-slate-300 capitalize">{product.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-amber-200">
                    ${product.price?.toLocaleString?.('es-AR') ?? product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
