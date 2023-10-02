import {
    addDoc,
    collection,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    limit,
    query,
    setDoc,
    startAfter,
    where,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { PAGE_SIZE, PAYMENT_URL } from '../utils/constants';
import { IProduct } from '../interfaces/product';
import { IOrder } from '../interfaces/order';
import { Token } from 'react-stripe-checkout';

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

/**
 * Adds a new user order to the 'orders' collection in the database.
 *
 * @param {IOrder} userData - The user order data to be added.
 * @returns {Promise<void>} A Promise that resolves when the order is successfully added.
 * @throws {Error} If there's an issue with adding the order to the database.
 */
export const addUserOrder = async (userData: IOrder): Promise<void> => {
    await addDoc(collection(db, 'orders'), userData);
};

/**
 * Makes a payment request to a specified payment URL using a provided token.
 *
 * @param {number} totalAmount - The total amount to be paid (in the smallest currency unit, e.g., cents).
 * @param {Token} token - The payment token used for processing the payment.
 * @returns {Promise<void>} A Promise that resolves when the payment request is successfully made.
 * @throws {Error} If there's an issue with the payment request or the response indicates an error.
 */
export const makePayment = async (
    totalAmount: number,
    token: Token
): Promise<void> => {
    await fetch(PAYMENT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: totalAmount * 100,
            token,
        }),
    });
};

/**
 * Retrieves all products associated with orders from the Firestore database
 * based on the provided user email.
 *
 * @param {string} userEmail - The email of the user to fetch orders for.
 * @returns {Promise<IProduct[]}>} A promise that resolves to an array of products
 * extracted from orders associated with the provided user email.
 */
export const getOrders = async (userEmail: string) => {
    const collectionRef = collection(db, 'orders');
    const q = query(collectionRef, where('user.email', '==', userEmail));
    const ordersData = await getDocs(q);

    const products: IProduct[] = [];

    ordersData.docs.forEach((order) => {
        const orderProducts: IProduct[] = order.data().products;
        products.push(...orderProducts);
    });

    return products;
};
