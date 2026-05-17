import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import { getToken, isTokenExpired, removeToken } from "./utils/token";

function App() {
    const [isAuth, setIsAuth] = useState(() => {
        if (!getToken()) return false;

        if (isTokenExpired()) {
            removeToken();
            return false;
        }

        return true;
    });

    const checkAuth = () => {
        if (!getToken()) return false;

        if (isTokenExpired()) {
            removeToken();
            return false;
        }

        return true;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuth ? (
                            <Dashboard onLogout={() => setIsAuth(false)} />
                        ) : (
                            <AuthPage onLogin={() => setIsAuth(true)} />
                        )
                    }
                />

                <Route
                    path="/team-details"
                    element={
                        checkAuth() ? (
                            <TeamDetailsPage />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;