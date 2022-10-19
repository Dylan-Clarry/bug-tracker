import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BugDetail from "./Pages/BugDetail";

function App() {
    const [bugList, setBugList] = useState<Bug[]>(
        JSON.parse(localStorage.getItem("bugList") || "[]")
    );
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

    const setLocalBugList = () => {
        localStorage.setItem("bugList", JSON.stringify(bugList));
    };

    const getLocalBugList = () => {
        if (localStorage.getItem("bugList") === null) {
            localStorage.setItem("bugList", JSON.stringify([]));
        } else {
            let bugListLocal: Bug[] = JSON.parse(
                localStorage.getItem("bugList") || "[]"
            );
            setBugList(bugListLocal);
        }
    };

    // Run once on startup
    useEffect(() => {
        getLocalBugList();
    }, []);

    useEffect(() => {
        handleFilterBugList();
        if (bugList) {
            setLocalBugList();
        }
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
