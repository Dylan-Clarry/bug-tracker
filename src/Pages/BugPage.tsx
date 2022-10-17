import React, { Dispatch, SetStateAction } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";

interface IBugPageProps {
    bugList: Bug[];
    setBugList: Dispatch<SetStateAction<Bug[]>>;
}

const BugPage: React.FC<IBugPageProps> = ({ bugList, setBugList }) => {
    const state = useLocation().state;
    const bug: Bug = state.bug;

    console.log("htns", bugList, setBugList);

    const handleDeleteBug = () => {
        //setBugList(bugList.filter((bugItem: Bug) => bugItem.id !== bug.id));
        setBugList([]);
        return <Navigate to="/home" />;
    };

    return (
        <div className="BugList flex">
            <div className="mt-10 mx-72 p-3 w-full border-solid border-2 border-cat-overlay0 rounded">
                <Link to="/">
                    <small className="underline">&lt;-Back</small>
                </Link>
                <br />
                <small>#{bug.id}</small>
                <h1>{bug.title}</h1>
                <p>{bug.text}</p>

                <button
                    onClick={(e: React.FormEvent) => {
                        e.preventDefault();
                        handleDeleteBug();
                    }}
                    className="mt-3 p-1 bg-cat-red rounded"
                >
                    Delete Bug
                </button>
            </div>
        </div>
    );
};

export default BugPage;
