import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from './config';

export async function getProducts() {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((productDoc) => ({
    id: productDoc.id,
    ...productDoc.data(),
  }));
}

export async function addProduct(product) {
  const productsRef = collection(db, 'products');
  const docRef = await addDoc(productsRef, product);
  return { id: docRef.id, ...product };
}

export async function createOrder(orderData) {
  const ordersRef = collection(db, 'orders');
  const payload = {
    ...orderData,
    createdAt: serverTimestamp(),
    status: 'pending',
  };

  const docRef = await addDoc(ordersRef, payload);
  return { id: docRef.id, ...orderData, status: 'pending' };
}

export function subscribeToOrders(callback) {
  const ordersRef = collection(db, 'orders');
  const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'));

  return onSnapshot(ordersQuery, (snapshot) => {
    const orders = snapshot.docs.map((orderDoc) => ({
      id: orderDoc.id,
      ...orderDoc.data(),
    }));

    callback(orders);
  });
}

export async function updateOrderStatus(orderId, status) {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, { status });
}
