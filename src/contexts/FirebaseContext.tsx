import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { auth, db, googleProvider } from '../firebase-config';
import {
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    User,
    UserCredential,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FirebaseProviderProps } from '../types';

interface FirebaseInitialState {
    user: User | null;
    signInWithGoogle: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
}

export const FirebaseContext = createContext<FirebaseInitialState>({
    user: null,
    signInWithGoogle: async () => {
        const result = await signInWithPopup(auth, googleProvider);
        await setDoc(doc(db, 'users', result.user.email!), {
            role: 2,
        });
    },
    signUp: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', email), {
            role: 2,
        });
    },
    signIn: (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    },
    logOut: () => {
        return signOut(auth);
    },
});

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        await setDoc(doc(db, 'users', result.user.email!), {
            role: 2,
        });
    };

    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', email), {
            role: 2,
        });
    };

    const signIn = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const logOut = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <FirebaseContext.Provider
            value={{
                user,
                signInWithGoogle,
                signUp,
                signIn,
                logOut,
            }}
        >
            {children ? children : <Outlet />}
        </FirebaseContext.Provider>
    );
};

export const useFirebaseContext = () => {
    const state = useContext(FirebaseContext);
    return state;
};
