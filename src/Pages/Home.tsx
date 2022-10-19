import React, { SetStateAction } from "react";
import Form from "../Components/Form";
import BugListItem from "../Components/BugListItem";

interface IHomeProps {
    bugList: Bug[];
    setBugList: React.Dispatch<SetStateAction<Bug[]>>;
    filteredBugList: Bug[];
    setStatus: React.Dispatch<SetStateAction<string>>;
}

const Home: React.FC<IHomeProps> = ({
    bugList,
    setBugList,
    filteredBugList,
    setStatus,
}) => {
    const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value.toUpperCase());
    };

    return (
        <div className="Home">
            <Form bugList={bugList} setBugList={setBugList} />
            <div className="flex">
                <div className="ic-border-container">
                    <div className="flex justify-between p-3">
                        <input placeholder="Search" />
                        <select onChange={handleSelectStatus}>
                            <option>All</option>
                            <option>Open</option>
                            <option>Closed</option>
                        </select>
                    </div>
                    <ul>
                        {!filteredBugList.length ? <h1>No Bugs</h1> : null}
                        {filteredBugList.map((bug) => {
                            return (
                                <BugListItem
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
        </div>
    );
};

export default Home;
