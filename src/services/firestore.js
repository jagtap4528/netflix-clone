import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const saveFavoritesToFirestore = async (
  userId,
  favorites
) => {
  await setDoc(
    doc(db, "favorites", userId),
    { favorites }
  );
};

export const getFavoritesFromFirestore = async (
  userId
) => {
  const snapshot = await getDoc(
    doc(db, "favorites", userId)
  );

  if (snapshot.exists()) {
    return snapshot.data().favorites;
  }

  return [];
};