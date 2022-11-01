import React, { useState, SetStateAction } from "react";

const apiUrl = "http://localhost:6969";

interface IFormProps {
    bugList: Bug[];
    setBugList: React.Dispatch<SetStateAction<Bug[]>>;
}

const Form: React.FC<IFormProps> = ({ bugList, setBugList }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    async function handleSubmit() {
        const newBug: Bug = {
            id: -1,
            title: title,
            text: text,
            closed: false,
        };
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBug),
        };
        const url = `${apiUrl}/bug`;
        const res = await fetch(url, opts);
        const json = await res.json();
        if (json.error) {
            console.error("Error creating new bug:", json.error);
            return;
        }
        setBugList([...bugList, json.data[0]]);
        setTitle("");
        setText("");
    }

    return (
        <div className="flex">
            <div className="ic-border-container p-3">
                <h1>Create New Bug</h1>
                <form
                    className="flex flex-col space-y-3"
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <label htmlFor="title">Title</label>
                    <input
                        className="max-w-[50%]"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="text">Text</label>
                    <textarea
                        className="max-w-[50%] h-32"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="bg-cat-green max-w-[25%]">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Form;
