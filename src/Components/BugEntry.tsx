import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faCircleXmark,
    faMessage,
} from "@fortawesome/free-solid-svg-icons";

interface IBugEntryProps {
    bug: Bug;
    key: number;
}

const BugEntry: React.FC<IBugEntryProps> = ({ bug }) => {
    return (
        <div className="BugEntry flex flex-row py-3">
            <div className="pl-2">
                {bug.closed ? (
                    <FontAwesomeIcon
                        className="text-cat-red"
                        icon={faCircleXmark}
                    />
                ) : (
                    <FontAwesomeIcon
                        className="text-cat-green"
                        icon={faCircle}
                    />
                )}
            </div>
            <div className="px-3 grow">
                <h1>{" " + bug.title}</h1>
                <Link to={`/bug/${bug.id}`} state={{ bug: bug }}>
                    Link
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

export default BugEntry;
