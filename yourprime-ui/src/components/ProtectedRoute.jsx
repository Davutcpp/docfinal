import { Navigate } from "react-router-dom";
import {
    getToken,
    isTokenExpired,
    removeToken
} from "../utils/token";

function ProtectedRoute({ children }) {
    const token = getToken();

    if (!token || isTokenExpired()) {
        removeToken();

        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;