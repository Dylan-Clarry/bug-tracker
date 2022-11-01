import React, { SetStateAction } from "react";
import Form from "../Components/Form";
import BugListItem from "../Components/BugListItem";

interface IHomeProps {
    bugList: Bug[];
    setBugList: React.Dispatch<SetStateAction<Bug[]>>;
    filteredBugList: Bug[];
    setStatus: React.Dispatch<SetStateAction<string>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<SetStateAction<string>>;
}

const Home: React.FC<IHomeProps> = ({
    bugList,
    setBugList,
    filteredBugList,
    setStatus,
    searchTerm,
    setSearchTerm,
}) => {
    const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value.toUpperCase());
    };

    return (
        <div className="Home">
            <Form bugList={bugList} setBugList={setBugList} />
            <div className="h-screen">
                <div className="flex">
                    <div className="ic-border-container mb-10">
                        <div className="flex justify-between p-3">
                            <input
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select onChange={handleSelectStatus}>
                                <option>All</option>
                                <option className="bg-cat-green">Open</option>
                                <option className="bg-cat-mauve">Closed</option>
                            </select>
                        </div>
                        <ul className="max-h-fit">
                            {!filteredBugList.length ? <h1>No Bugs</h1> : null}
                            {filteredBugList.map((bug) => {
                                return (
                                    <BugListItem
                                        bug={bug}
                                        bugList={bugList}
                                        key={bug.id}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
