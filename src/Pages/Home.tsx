import React from "react";
import BugList from "../Components/BugList";
import { useState } from "react";
import Form from "../Components/Form";

const testBugList: Bug[] = [
    {
        id: 1,
        title: "Test Bug",
        text: "This is a test and you failed the test!!!",
        closed: false,
    },
    {
        id: 2,
        title: "Test 2",
        text: "How about another?",
        closed: true,
    },
];

const Home: React.FC = () => {
    const [bugList, setBugList] = useState<Bug[]>(testBugList);

    return (
        <div className="Home">
            <Form bugList={bugList} setBugList={setBugList} />
            <BugList bugList={bugList} setBugList={setBugList} />
        </div>
    );
};

export default Home;
