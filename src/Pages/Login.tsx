import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const apiUrl = "http://localhost:6969";

export default function Login(): JSX.Element {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(true);
    const nav = useNavigate();

    async function handleLogin(): Promise<void> {
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userName,
                password: password,
            }),
        };
        const url = apiUrl + "/user/login";
        const res = await fetch(url, opts);
        const json = await res.json();
        if (json.error) {
            console.error("Error logging in:", json.error);
            return;
        }

        if (json.data && json.data.id) {
            nav("/home");
        } else {
            alert("Failed login\nIncorrect login credentials");
        }
    }

    function handleDemoLogin() {
        setUserName("password");
        setPassword("password");
    }

    return (
        <div className="login">
            <div className="h-screen flex items-center justify-center">
                <form className="flex flex-col p-10 border-solid border-2 border-cat-overlay0 rounded">
                    <input
                        className="mb-3"
                        placeholder="Username"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <div className="mb-3">
                        <input
                            placeholder="Password"
                            type={hidden ? "password" : "text"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setHidden(!hidden);
                            }}
                        >
                            <FontAwesomeIcon
                                className="active:border-none css-neg-m"
                                icon={hidden ? faEye : faEyeSlash}
                            />
                        </button>
                    </div>
                    <button
                        className="bg-cat-green w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                    >
                        login
                    </button>
                    <br />
                    <a
                        className="text-center hover:cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDemoLogin();
                        }}
                    >
                        <u>Demo Login</u>
                    </a>
                </form>
            </div>
        </div>
    );
}
