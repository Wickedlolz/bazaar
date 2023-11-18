import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { auth, googleProvider } from '../firebase-config';
import {
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    User,
    UserCredential,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseProviderProps } from '../types';

interface FirebaseInitialState {
    user: User | null;
    signInWithGoogle: () => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
}

export const FirebaseContext = createContext<FirebaseInitialState>({
    user: null,
    signInWithGoogle: () => {
        return signInWithPopup(auth, googleProvider);
    },
    signUp: (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
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

    const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

    const signUp = (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

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
