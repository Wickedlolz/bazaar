import {
    collection,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    limit,
    query,
    setDoc,
    startAfter,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { PAGE_SIZE } from '../utils/constants';
import { IProduct } from '../interfaces/product';

/**
 * Retrieves the total count of items from the 'allProducts' collection in the database.
 *
 * @returns {Promise<number>} A Promise that resolves to the total item count.
 * @throws {Error} If an error occurs while querying the database.
 */
export const getItemsCount = async () => {
    const collectionRef = collection(db, 'allProducts');
    const snapshot = await getCountFromServer(query(collectionRef));

    return snapshot;
};

/**
 * Fetches the next batch of products from the 'allProducts' collection in the database.
 *
 * @returns {Promise<QuerySnapshot>} A Promise that resolves to a QuerySnapshot containing the next set of products.
 * @throws {Error} If an error occurs while querying the database.
 */
export const fetchNextProducts = async () => {
    const firstProductsQuery = query(
        collection(db, 'allProducts'),
        limit(PAGE_SIZE)
    );
    const documentSnapshots = await getDocs(firstProductsQuery);

    const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const nextProducts = await getDocs(
        query(
            collection(db, 'allProducts'),
            startAfter(lastVisible),
            limit(PAGE_SIZE)
        )
    );

    return nextProducts;
};

/**
 * Retrieves product information from the Firestore database by its unique identifier.
 *
 * @param {string} productId - The unique identifier of the product to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the product data if found, or null if not found.
 * @throws {Error} Throws an error if there's an issue with Firestore communication.
 */
export const getProductById = async (productId: string) => {
    const docRef = doc(db, 'allProducts', productId);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
};

/**
 * Updates a product in the Firestore database by its unique identifier.
 *
 * @param {string} productId - The unique identifier of the product to update.
 * @param {Object} updateProduct - The updated product data to set in the database.
 * @returns {Promise<void>} A promise that resolves when the update is successful.
 * @throws {Error} Throws an error if there's an issue with Firestore communication.
 */
export const updateProductById = async (
    productId: string,
    updateProduct: IProduct
) => {
    const docRef = doc(db, 'allProducts', productId);
    await setDoc(docRef, updateProduct);
};
