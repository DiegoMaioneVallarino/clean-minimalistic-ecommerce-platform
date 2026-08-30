import { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/auth.css";

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

    const isRegister = mode === "register";

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (isRegister) {
            console.log({
                name,
                email,
                password,
            });

            return;
        }

        console.log({
            email,
            password,
        });
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