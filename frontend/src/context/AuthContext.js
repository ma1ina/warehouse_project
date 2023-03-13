import React, { useEffect } from "react";
import settings from "../settings";


const AuthContext = React.createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [tokens, setTokens] = React.useState(() => (localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null));
    const [loading, setLoading] = React.useState(true);

    const login = async (e) => {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;
        let response = await fetch(`${settings.apiUrl}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (response.status === 200) {
            let data = await response.json();
            setTokens(data);
            localStorage.setItem("tokens", JSON.stringify(data));
            window.location.href = "/items";
        }
        if (response.status === 401) {
            alert("Invalid credentials");
        }

    };

    const logout = () => {
        setTokens(null);
        localStorage.removeItem("tokens");
        window.location.href = "/login";
    };


    useEffect(() => {
        let updateTokens = async () => {
            if (!tokens) {
                setLoading(false);
                return;
            }
            let response = await fetch(`${settings.apiUrl}/token/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: tokens.refresh }),
            });
            if (response.status === 200) {
                let data = await response.json();
                setTokens((prevTokens) => ({
                    ...prevTokens,
                    access: data.access,
                }));
                localStorage.setItem(
                    "tokens",
                    JSON.stringify({ access: data.access, refresh: tokens.refresh })
                );

            } else {
                logout();
            }
            setLoading(false);
        };
        if (loading) {
            updateTokens()
        }
        if (tokens) {
            let interval = setInterval(updateTokens, 1000 * 60 * 4.5);
            return () => clearInterval(interval);
        }
    }, [tokens, loading]);





    const contextValues = {
        "tokens": tokens,
        "login": login,
        "logout": logout,

    }

    return (
        <AuthContext.Provider value={contextValues}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}