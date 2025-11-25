import React, { useEffect, useState } from 'react';
import { addProduct, getProducts } from '../firebase/api';

const INITIAL_MENU = [
  { name: 'Cheese (Simple)', price: 8000, category: 'alfajores' },
  { name: 'Cheese (Combo)', price: 11000, category: 'alfajores' },
  { name: 'Onion (Simple)', price: 9000, category: 'alfajores' },
  { name: 'Onion (Combo)', price: 12000, category: 'alfajores' },
  { name: 'American (Simple)', price: 9000, category: 'alfajores' },
  { name: 'American (Combo)', price: 12000, category: 'alfajores' },
  { name: 'Pickle (Simple)', price: 9000, category: 'alfajores' },
  { name: 'Pickle (Combo)', price: 12000, category: 'alfajores' },
  { name: 'Caja Alfajores (4 Cheese)', price: 20000, category: 'especiales' },
  { name: 'Bandeja de Papas', price: 4000, category: 'especiales' },
  { name: 'Papas con Bacon', price: 5000, category: 'especiales' },
  { name: 'Gaseosa', price: 2500, category: 'bebidas' },
  { name: 'Agua Saborizada', price: 2500, category: 'bebidas' },
  { name: 'Agua / Soda', price: 2000, category: 'bebidas' },
  { name: 'Liso Santa Fe', price: 1000, category: 'bebidas' },
  { name: 'Pinta Heineken', price: 4000, category: 'bebidas' },
  { name: 'Fernet', price: 3000, category: 'tragos' },
  { name: 'Gin Heredero', price: 3000, category: 'tragos' },
  { name: 'Vermut', price: 3000, category: 'tragos' },
  { name: 'Medallón Extra', price: 2000, category: 'extras' },
  { name: 'Extra Bacon', price: 1000, category: 'extras' },
];

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

  const handleLoadInitialMenu = async () => {
    try {
      await Promise.all(INITIAL_MENU.map((item) => addProduct(item)));
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
      console.log('Menú inicial cargado');
      alert('Menú cargado correctamente');
    } catch (error) {
      console.error('Error al cargar el menú', error);
      alert('Hubo un problema al cargar el menú');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream px-6 py-12 text-brand-green">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark/70">Administración</p>
            <h1 className="heading-font mt-3 text-3xl font-bold">Cargar nuevos productos</h1>
            <p className="mt-1 text-sm text-brand-dark">Gestiona el catálogo disponible en el punto de venta.</p>
          </div>
          <div className="space-y-3 text-right">
            <div className="rounded-2xl border border-brand-green/20 bg-white/70 px-4 py-3 shadow">
              <p className="text-xs font-semibold uppercase text-brand-dark">Productos</p>
              <p className="text-lg font-semibold text-brand-green">{products.length}</p>
            </div>
            <button
              type="button"
              onClick={handleLoadInitialMenu}
              className="w-full rounded-xl bg-brand-green px-4 py-2 text-sm font-semibold text-brand-cream transition hover:bg-brand-dark"
            >
              ⚠️ CARGAR MENÚ COMPLETO
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-brand-green/20 bg-white/70 p-8 shadow"
          >
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Alfajor de chocolate"
                required
                className="mt-2 w-full rounded-xl border border-brand-green/30 bg-white px-4 py-3 text-sm text-brand-green placeholder:text-brand-dark/60 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/40"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ej. 1500"
                  required
                  className="mt-2 w-full rounded-xl border border-brand-green/30 bg-white px-4 py-3 text-sm text-brand-green placeholder:text-brand-dark/60 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/40"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark">Categoría</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-brand-green/30 bg-white px-4 py-3 text-sm text-brand-green focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/40"
                >
                  <option value="comida">Comida</option>
                  <option value="bebida">Bebida</option>
                  <option value="extra">Extra</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-green px-4 py-3 text-sm font-semibold text-brand-cream shadow-lg shadow-brand-green/30 transition hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-green/40"
            >
              Guardar Producto
            </button>
          </form>

          <div className="space-y-4 rounded-3xl border border-brand-green/20 bg-white/70 p-6 shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-brand-green">Productos actuales</p>
              <span className="text-xs text-brand-dark">{products.length} items</span>
            </div>
            <div className="space-y-3">
              {products.length === 0 && (
                <p className="text-sm text-brand-dark">No hay productos cargados todavía.</p>
              )}
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-2xl border border-brand-green/20 bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-brand-green">{product.name}</p>
                    <p className="text-xs text-brand-dark capitalize">{product.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-brand-dark">
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
