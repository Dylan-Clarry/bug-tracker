import React, { Dispatch, SetStateAction } from "react";
import BugEntry from "./BugEntry";

interface IBugListProps {
    bugList: Bug[];
    setBugList: Dispatch<SetStateAction<Bug[]>>;
}

const BugList: React.FC<IBugListProps> = ({ bugList }) => {
    return (
        <div className="BugList flex">
            <div className="mt-10 mx-72 w-full border-solid border-2 border-cat-overlay0 rounded">
                <ul>
                    {bugList.map((bug) => {
                        return <BugEntry bug={bug} key={bug.id} />;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default BugList;
