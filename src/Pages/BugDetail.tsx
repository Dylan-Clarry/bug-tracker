import React, { useState, useEffect, SetStateAction } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const apiUrl = "http://localhost:6969";

interface IParams {
    id: string;
}

interface IBugPageProps {
    bugList: Bug[];
    setBugList: React.Dispatch<SetStateAction<Bug[]>>;
}

const BugDetail: React.FC<IBugPageProps> = ({ bugList, setBugList }) => {
    const { id } = useParams<keyof IParams>() as IParams;
    const [bug, setBug] = useState<Bug>({
        id: -1,
        title: "",
        text: "",
        closed: true,
    } as Bug);
    const navigate = useNavigate();
    const [editTitle, setEditTitle] = useState<string>(bug.title);
    const [editText, setEditText] = useState<string>(bug.text);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        requestBugById(+id);
    }, []);

    useEffect(() => {
        requestBugById(+id);
    }, [bugList]);

    // will keep this here to implement caching later
    function getBugById(paramId: number) {
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
    }

    async function requestBugById(paramId: number): Promise<void> {
        const opts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const url = `${apiUrl}/bug/${paramId}`;
        const res = await fetch(url, opts);
        const json = await res.json();
        if (json.error) {
            console.log("Error requesting bug:", json.error, "url:", url);
            return;
        }
        if (json.data) {
            setBug(json.data as Bug);
        }
    }

    async function handleBugUpdate(action: string) {
        const updatedBug =
            action === "status"
                ? {
                      ...bug,
                      closed: !bug.closed,
                  }
                : {
                      ...bug,
                      title: editTitle,
                      text: editText,
                  };
        const opts = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBug),
        };
        const res = await fetch(`${apiUrl}/bug/${bug.id}`, opts);
        const json = await res.json();
        if (json.error) {
            console.error(
                `PUT Error from request sent to ${apiUrl}/bug/${bug.id}`,
                opts,
                json.error
            );
            return;
        }
        const preBugList = bugList.filter((bug) => bug.id !== +id);
        setBugList([...preBugList, updatedBug]);
        if (action === "edit") {
            setEditMode(!editMode);
        }
    }

    async function handleDeleteBug() {
        const opts = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await fetch(`${apiUrl}/bug/${bug.id}`, opts);
        const json = await res.json();
        if (!json.error) {
            setBugList(bugList.filter((bugItem: Bug) => bugItem.id !== bug.id));
            navigate("/");
        } else {
            console.error("Error:", json.error);
        }
    }

    return (
        <div className="h-screen">
            <div className="BugList flex">
                <div className="ic-border-container p-3">
                    <Link to="/">
                        <small className="underline">&lt;-Back</small>
                    </Link>
                    <br />

                    {bug.id === -1 ? (
                        <div>
                            <h1>Loading...</h1>
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
                                    handleBugUpdate("status");
                                }}
                                className={
                                    "mt-3 p-1 mr-2 rounded " +
                                    (!bug.closed
                                        ? "bg-cat-mauve"
                                        : "bg-cat-green")
                                }
                            >
                                {bug.closed ? "Open Bug" : "Close Bug"}
                            </button>
                            {editMode ? (
                                <>
                                    <button
                                        onClick={(e: React.FormEvent) => {
                                            e.preventDefault();
                                            handleBugUpdate("edit");
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
        </div>
    );
};

export default BugDetail;
