import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BugDetail from "./Pages/BugDetail";

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

function App() {
    const [bugList, setBugList] = useState<Bug[]>(testBugList);
    const [filteredBugList, setFilteredBugList] = useState<Bug[]>(bugList);
    const [status, setStatus] = useState<string>("all");

    const handleFilterBugList = () => {
        switch (status) {
            case "OPEN":
                setFilteredBugList(bugList.filter((bug: Bug) => !bug.closed));
                break;
            case "CLOSED":
                setFilteredBugList(bugList.filter((bug: Bug) => bug.closed));
                break;
            default:
                setFilteredBugList(bugList);
                break;
        }
    };

    useEffect(() => {
        handleFilterBugList();
    }, [status, bugList]);

    return (
        <div className="App h-screen bg-cat-base text-cat-text">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                bugList={bugList}
                                setBugList={setBugList}
                                filteredBugList={filteredBugList}
                                setStatus={setStatus}
                            />
                        }
                    />
                    <Route
                        path="/bug/:id"
                        element={
                            <BugDetail
                                bugList={bugList}
                                setBugList={setBugList}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
