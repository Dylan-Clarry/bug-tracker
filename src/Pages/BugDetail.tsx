import React, { useState, SetStateAction } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface IParams {
    id: string;
}

interface IBugPageProps {
    bugList: Bug[];
    setBugList: React.Dispatch<SetStateAction<Bug[]>>;
}

const BugDetail: React.FC<IBugPageProps> = ({ bugList, setBugList }) => {
    const getBugById = (paramId: number) => {
        let bugList: Bug[] = JSON.parse(
            localStorage.getItem("bugList") || "[]"
        );
        if (bugList) {
            for (let i = 0; i < bugList.length; i++) {
                if (bugList[i].id === paramId) return bugList[i];
            }
        }
        const bug: Bug = {
            id: -1,
            title: "",
            text: "",
            closed: true,
        };
        return bug;
    };
    const { id } = useParams<keyof IParams>() as IParams;
    const bug: Bug = getBugById(+id);

    const [editTitle, setEditTitle] = useState<string>(bug.title);
    const [editText, setEditText] = useState<string>(bug.text);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleUpdateBug = () => {
        const preBugList = bugList.filter((bug) => bug.id !== +id);
        const updatedBug = {
            ...bug,
            title: editTitle,
            text: editText,
        };
        setBugList([...preBugList, updatedBug]);
        setEditMode(!editMode);
    };

    const handleBugStatusUpdate = () => {
        const preBugList = bugList.filter((bug) => bug.id !== +id);
        const updatedBug = {
            ...bug,
            closed: !bug.closed,
        };
        setBugList([...preBugList, updatedBug]);
    };

    const navigate = useNavigate();
    const handleDeleteBug = () => {
        setBugList(bugList.filter((bugItem: Bug) => bugItem.id !== bug.id));
        navigate("/");
    };

    return (
        <div className="BugList flex">
            <div className="ic-border-container p-3">
                <Link to="/">
                    <small className="underline">&lt;-Back</small>
                </Link>
                <br />

                {bug.id === -1 ? (
                    <div>
                        <h1>Error retrieving bug #{+id}</h1>
                    </div>
                ) : (
                    <div>
                        <div>
                            <small>
                                <span className="pr-2">
                                    {bug.closed ? (
                                        <FontAwesomeIcon
                                            className="text-cat-mauve"
                                            icon={faCircle}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            className="text-cat-green"
                                            icon={faCircle}
                                        />
                                    )}
                                </span>
                                Bug #{bug.id}
                            </small>

                            {editMode ? (
                                <>
                                    <br />
                                    <input
                                        className="underline text-lg my-3"
                                        value={editTitle}
                                        onChange={(e) => {
                                            setEditTitle(e.target.value);
                                        }}
                                    />
                                    <br />
                                    <textarea
                                        className="my-3"
                                        value={editText}
                                        onChange={(e) => {
                                            setEditText(e.target.value);
                                        }}
                                    />
                                    <br />
                                </>
                            ) : (
                                <>
                                    <h1 className="underline text-lg my-3">
                                        {bug.title}
                                    </h1>
                                    <p className="my-3">{bug.text}</p>
                                </>
                            )}
                        </div>

                        <button
                            onClick={(e: React.FormEvent) => {
                                e.preventDefault();
                                setEditMode(!editMode);
                            }}
                            className="mt-3 p-1 mr-2 bg-cat-sapphire rounded"
                        >
                            {!editMode ? "Edit Bug" : "Cancel edit"}
                        </button>
                        <button
                            onClick={(e: React.FormEvent) => {
                                e.preventDefault();
                                handleBugStatusUpdate();
                            }}
                            className={
                                "mt-3 p-1 mr-2 rounded " +
                                (!bug.closed ? "bg-cat-mauve" : "bg-cat-green")
                            }
                        >
                            {bug.closed ? "Open Bug" : "Close Bug"}
                        </button>
                        {editMode ? (
                            <>
                                <button
                                    onClick={(e: React.FormEvent) => {
                                        e.preventDefault();
                                        handleUpdateBug();
                                    }}
                                    className="mt-3 mr-2 p-1 bg-cat-peach rounded"
                                >
                                    Confirm Edit
                                </button>
                                <button
                                    onClick={(e: React.FormEvent) => {
                                        e.preventDefault();
                                        handleDeleteBug();
                                    }}
                                    className="mt-3 p-1 bg-cat-red rounded"
                                >
                                    Delete Bug
                                </button>
                            </>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BugDetail;
