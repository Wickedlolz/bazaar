import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Outlet } from 'react-router-dom';
import { auth, googleProvider } from '../firebase-config';
import {
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    User,
    UserCredential,
} from 'firebase/auth';

interface FirebaseInitialState {
    user: User | null;
    signInWithGoogle: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
}

export const FirebaseContext = createContext<FirebaseInitialState>({
    user: null,
    signInWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result;
        } catch (error) {
            throw error;
        }
    },
    logOut: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    },
});

interface IProps {
    children: ReactNode;
}

export const FirebaseProvider = ({ children }: IProps) => {
    const [user, setUser] = useState<User | null>(null);

    const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

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
