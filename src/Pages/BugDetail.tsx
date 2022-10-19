import React, { SetStateAction } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
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
        let bugListLocal: Bug[] = JSON.parse(
            localStorage.getItem("bugList") || "[]"
        );
        if (bugListLocal) {
            for (let i = 0; i < bugListLocal.length; i++) {
                console.log("bugListLocal", bugListLocal[i]);
                console.log("paramId", paramId);
                if (bugListLocal[i].id === paramId) return bugListLocal[i];
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

    const handleDeleteBug = () => {
        setBugList(bugList.filter((bugItem: Bug) => bugItem.id !== bug.id));
    };

    const { id } = useParams<keyof IParams>() as IParams;
    console.log("paramId", id);
    const bug: Bug = getBugById(+id);

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
                            <h1 className="underline text-lg my-3">
                                {bug.title}
                            </h1>
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
                )}
            </div>
        </div>
    );
};

export default BugDetail;
