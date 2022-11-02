export default function Login(): JSX.Element {
    return (
        <div className="login">
            <div className="h-screen flex items-center justify-center">
                <form className="p-10 border-solid border-2 border-cat-overlay0 rounded">
                    <input className="mb-3" placeholder="Username" type="text" />
                    <div className="mb-3">
                        <input placeholder="Password" type="password" />
                        <button>eye</button>
                    </div>
                    <button>login</button>
                    <br/>
                    <a>
                        <u>Demo Login</u>
                    </a>
                </form>
            </div>
        </div>
    );
}
