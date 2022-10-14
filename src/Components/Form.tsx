import React, { useState, Dispatch, SetStateAction } from "react";

interface IFormProps {
    bugList: Bug[];
    setBugList: Dispatch<SetStateAction<Bug[]>>;
}

const Form: React.FC<IFormProps> = ({ bugList, setBugList }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = () => {
        console.log(title, text);
        const newBug: Bug = {
            id: 10,
            closed: false,
            title: title,
            text: text,
        };
        setBugList([...bugList, newBug]);
    };

    return (
        <div className="flex">
            <div className="mt-10 mx-72 p-3 w-full border-solid border-2 border-cat-overlay0 rounded">
                <h1>Create New Bug</h1>
                <form
                    className="flex flex-col space-y-3"
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <label htmlFor="title">
                        Title
                        <input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label htmlFor="text">
                        Text
                        <input
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Form;
