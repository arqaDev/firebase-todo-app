import { getDocs, collection } from "firebase/firestore"
import { db } from "../firebase"


/**
 * Загружает данные из базы и возвращает список
 * @returns {Array<Object>} возращает список todo
 */
export const useFetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"))
    const data = querySnapshot.docs.map(doc => (doc.data()))
    return data
}
