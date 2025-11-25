# 🍔 AlfajorApp V2 - Sistema POS & KDS Realtime

## 1. Visión del Proyecto
Aplicación web progresiva (PWA) de alto rendimiento para la gestión de pedidos en "Alfajor con Papas". El sistema elimina la necesidad de servidores tradicionales utilizando una arquitectura Serverless.
**Objetivo:** Velocidad extrema en la toma de pedidos (POS) y sincronización instantánea con la cocina (KDS).

## 2. Stack Tecnológico (Estricto)
* **Core:** React 18 (Vite build).
* **Lenguaje:** JavaScript (ES6+).
* **Estilos:** Tailwind CSS (Utility-first).
* **Backend/DB:** Firebase v9 (Firestore & Auth).
* **Iconos:** Lucide-React.
* **Routing:** React Router DOM v6.
* **State Management:** React Context API + Reducers.

## 3. Arquitectura de Datos (Firestore NoSQL)

### Colección: `products`
*Catálogo de ítems a la venta.*
```json
{
  "id": "auto-generated-uid",
  "name": "Alfajor de Maicena",
  "price": 1500,
  "category": "alfajores", // enum: 'alfajores', 'papas', 'bebidas'
  "stock": true,
  "image_url": "https://..."
}
````

### Colección: `orders`

*Pedidos en tiempo real.*

```json
{
  "id": "auto-generated-uid",
  "created_at": "serverTimestamp",
  "status": "pending", // enum: 'pending', 'ready', 'delivered'
  "total": 4500,
  "items": [
    { "id": "prod_id", "name": "Alfajor", "qty": 2, "price": 1500 }
  ]
}
```

## 4\. Estructura de Módulos y Rutas

### A. Terminal de Venta (Ruta `/`)

  * **Layout:** Dos columnas. Izquierda (Grid de productos por categoría). Derecha (Ticket actual sticky).
  * **Funcionalidad:** Agregar items con un click. Modificar cantidad en el ticket. Botón grande "COBRAR" que envía a Firestore y resetea el estado.
  * **UX:** Feedback visual inmediato (Toasts/Alerts).

### B. Kitchen Display System - KDS (Ruta `/cocina`)

  * **Layout:** Tablero Kanban simplificado o Grid de tarjetas.
  * **Lógica Realtime:** Escucha `onSnapshot` de la colección `orders`.
  * **Estados:**
    1.  **Nuevos:** Color Amarillo.
    2.  **Listos:** Color Verde (Cajero grita el nombre).
    3.  **Entregados:** Se ocultan de la vista principal.

### C. Backoffice Simplificado (Ruta `/admin`)

  * CRUD básico para crear y editar productos (cambiar precios o pausar stock).

## 5\. Requerimientos No Funcionales

  * **Responsive:** Debe verse bien en Tablet (Caja) y Monitor TV (Cocina).
  * **Offline First:** Manejo básico de desconexión.
  * **Performance:** Code-splitting por rutas.

## 6\. Guía de Estilos (Tailwind)

  * **Primary:** `amber-500` (referencia al alfajor/papas).
  * **Secondary:** `slate-900` (fondo oscuro para cocina para reducir fatiga visual).
  * **Accent:** `emerald-500` (acciones de éxito/cobrar).

<!-- end list -->

```

---

### PASO 2: El Prompt Detonador (Para Codex/GPT)

Una vez que tengas ese README en tu proyecto (o se lo pegues primero a la IA), envíale este mensaje exacto. Está diseñado para obligar a la IA a generar **todo** el código necesario.

**Copia y pega esto en el chat de la IA:**

> "Actúa como un Arquitecto de Software Senior y Desarrollador React experto.
>
> **CONTEXTO:** He diseñado una aplicación llamada 'AlfajorApp V2'. Las especificaciones completas, el modelo de datos y el stack tecnológico están definidos en el README que te acabo de proporcionar (o que está en este contexto).
>
> **TU TAREA:** Necesito que generes TODO el código fuente necesario para tener la aplicación funcionando. Debes seguir estos pasos estrictamente:
>
> 1.  **Setup Inicial:** Dame los comandos de `npm` para instalar las dependencias exactas mencionadas (Vite, Firebase, Router, Tailwind, Lucide).
> 2.  **Configuración:** Genera el archivo `src/firebase/config.js` y el `tailwind.config.js`.
> 3.  **Contexto Global:** Escribe el código para `src/context/OrderContext.jsx` que maneje el carrito de compras y la lógica de enviar pedidos a Firebase.
> 4.  **Componentes UI:** Genera componentes modulares (ProductCard, OrderTicket, KitchenTicket).
> 5.  **Vistas:** Genera el código completo para `POSPage.jsx` (Caja), `KitchenPage.jsx` (Cocina) y `AdminPage.jsx`.
> 6.  **Ruteo:** Configura el `App.jsx` y `main.jsx`.
>
> **REGLAS:**
> * Escribe código completo y funcional, no dejes 'TODOs' ni partes incompletas.
> * Usa Tailwind CSS para todo el estilo, asegúrate de que se vea moderno y limpio.
> * Asegúrate de manejar la conexión con Firebase correctamente.
>
> Empieza por el paso 1 y ve avanzando. ¡A trabajar!"

---
