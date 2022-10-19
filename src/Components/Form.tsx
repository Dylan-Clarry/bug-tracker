import React, { useState, SetStateAction } from "react";

interface IFormProps {
    bugList: Bug[];
    setBugList: React.Dispatch<SetStateAction<Bug[]>>;
}

const Form: React.FC<IFormProps> = ({ bugList, setBugList }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = () => {
        const id = Math.floor(Math.random() * 10000);
        const newBug: Bug = {
            id: id,
            title: title,
            text: text,
            closed: false,
        };
        setBugList([...bugList, newBug]);
        setTitle("");
        setText("");
    };

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
