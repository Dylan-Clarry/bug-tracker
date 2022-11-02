import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login(): JSX.Element {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(true);
    const nav = useNavigate();

    async function handleLogin(): Promise<void> {
        const 
        nav("/home");
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
                            type="password"
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
