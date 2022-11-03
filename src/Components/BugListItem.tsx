import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMessage } from "@fortawesome/free-solid-svg-icons";

interface IBugEntryProps {
    bug: Bug;
    bugList: Bug[];
}

const BugListItem: React.FC<IBugEntryProps> = ({ bug, bugList }) => {
    return (
        <div className="BugEntry flex flex-row py-3">
            <div className="pl-2">
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
            </div>
            <div className="px-3 grow">
                <Link
                    to={`/bug/${bug.id}`}
                    state={{
                        bug: bug,
                        bugList: bugList,
                    }}
                >
                    <small className="text-xs">Bug #{bug.id}</small>
                    <h1 className="text-lg underline">
                    {" " + bug.title}</h1>
                </Link>
                <p>{bug.text}</p>
            </div>
            <div className="pr-2">
                <FontAwesomeIcon
                    className="text-cat-subtext0"
                    icon={faMessage}
                />
            </div>
        </div>
    );
};

export default BugListItem;
