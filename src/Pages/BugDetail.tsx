import React, { SetStateAction } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface IBugPageProps {
    bugList: Bug[];
    setBugList: React.Dispatch<SetStateAction<Bug[]>>;
}

const BugDetail: React.FC<IBugPageProps> = ({ bugList, setBugList }) => {
    const state = useLocation().state;
    const bug: Bug = state.bug;

    const handleDeleteBug = () => {
        setBugList(bugList.filter((bugItem: Bug) => bugItem.id !== bug.id));
    };

    return (
        <div className="BugList flex">
            <div className="ic-border-container p-3">
                <Link to="/">
                    <small className="underline">&lt;-Back</small>
                </Link>
                <br />

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
                    <h1 className="underline text-lg my-3">{bug.title}</h1>
                    <p className="my-3">{bug.text}</p>
                </div>

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

export default BugDetail;
