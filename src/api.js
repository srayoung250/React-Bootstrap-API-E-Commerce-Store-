import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const productsRef = collection(db, "products");

export async function getProducts() {
  const snap = await getDocs(productsRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProduct(id) {
  const snap = await getDoc(doc(db, "products", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function createProduct(product) {
  const docRef = await addDoc(productsRef, product);
  return { id: docRef.id, ...product };
}

export async function updateProduct(id, product) {
  await updateDoc(doc(db, "products", id), product);
  return { id, ...product };
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, "products", id));
}
