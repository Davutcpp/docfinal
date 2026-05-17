import { useState } from "react";
import { login, register } from "../services/auth";
import { saveToken } from "../utils/token";

function AuthPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                const result = await login({
                    email,
                    password
                });

                saveToken(result.token);
                onLogin();
            } else {
                await register({
                    email,
                    username,
                    age: Number(age),
                    password
                });

                setMessage("Registration successful");
                setIsLogin(true);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h2>{isLogin ? "Login" : "Register"}</h2>

                {!isLogin && (
                    <>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    {isLogin ? "Login" : "Register"}
                </button>

                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Go to Register" : "Go to Login"}
                </button>

                <p>{message}</p>
            </form>

            <style>{`
                .auth {
                    padding: 30px;
                }

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    width: 260px;
                }

                input, button {
                    padding: 8px;
                }
            `}</style>
        </div>
    );
}

export default AuthPage;