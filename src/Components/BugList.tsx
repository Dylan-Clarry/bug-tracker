import React, { Dispatch, SetStateAction } from "react";
import BugDetail from "./BugDetail";

interface IBugListProps {
    bugList: Bug[];
    setBugList: Dispatch<SetStateAction<Bug[]>>;
}

const BugList: React.FC<IBugListProps> = ({ bugList, setBugList }) => {
    return (
        <div className="BugList flex">
            <div className="mt-10 mx-72 w-full border-solid border-2 border-cat-overlay0 rounded">
                <ul>
                    {bugList.map((bug) => {
                        return (
                            <BugDetail
                                bug={bug}
                                bugList={bugList}
                                setBugList={setBugList}
                                key={bug.id}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default BugList;
