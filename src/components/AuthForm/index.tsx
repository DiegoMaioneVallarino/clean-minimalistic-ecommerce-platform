import { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/auth.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

type AuthMode = "login" | "register";

type AuthFormProps = {
    mode: AuthMode;
};

function AuthForm({
    mode,
}: AuthFormProps) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");


    const isRegister = mode === "register";
    const { login, register } = useAuth();

    const navigate = useNavigate();


    function validateEmail(
    email: string
): boolean {
    return (
        email.includes("@") &&
        email.includes(".")
    );
}

function validatePassword(
    password: string
): boolean {
    return password.length >= 6;
}

function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
) {
    event.preventDefault();

    setError("");

    if (!validateEmail(email)) {
        setError(
            "Enter a valid email address."
        );

        return;
    }

    if (!validatePassword(password)) {
        setError(
            "Password must contain at least 6 characters."
        );

        return;
    }

    if (
        isRegister &&
        name.trim().length < 2
    ) {
        setError(
            "Name must contain at least 2 characters."
        );

        return;
    }

    if (isRegister) {
        const success = register(
            name.trim(),
            email,
            password
        );

        if (!success) {
            setError(
                "Unable to create account."
            );

            return;
        }

        navigate("/");

        return;
    }

    const success = login(
        email,
        password
    );

    if (!success) {
        setError(
            "Invalid email or password."
        );

        return;
    }

    navigate("/");
}

    return (
        <section className="auth-page">

            <div className="auth-container">

                <div className="auth-header">
                    <p>MINIMAL</p>

                    <h1>
                        {isRegister
                            ? "Create account"
                            : "Welcome back"}
                    </h1>

                    <span>
                        {isRegister
                            ? "Create an account to continue."
                            : "Sign in to your account."}
                    </span>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {isRegister && (
                        <label>
                            Name

                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value
                                    )
                                }
                                placeholder="Your name"
                                required
                            />
                        </label>
                    )}

                    <label>
                        Email

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            placeholder="you@example.com"
                            required
                        />
                    </label>

                    <label>
                        Password

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="••••••••"
                            required
                        />
                    </label>
                            {error && (
                <p className="auth-error">
                    {error}
                </p>
            )}
                    <button type="submit">
                        {isRegister
                            ? "Create account"
                            : "Sign in"}
                    </button>

                </form>

                <div className="auth-switch">

                    {isRegister ? (
                        <p>
                            Already have an account?{" "}
                            <Link to="/login">
                                Sign in
                            </Link>
                        </p>
                    ) : (
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register">
                                Create one
                            </Link>
                        </p>
                    )}

                </div>

            </div>

        </section>
    );
}

export default AuthForm;