import { Navigate, Outlet } from 'react-router-dom';
import { useFirebaseContext } from '../../contexts/FirebaseContext';

const AuthGuard = () => {
    const { user } = useFirebaseContext();

    if (!user) {
        return <Navigate to="/" replace={true} />;
    }

    return <Outlet />;
};

export default AuthGuard;
