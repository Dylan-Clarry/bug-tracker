import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BugDetail from "./Pages/BugDetail";

const apiUrl = "http://localhost:6969/bug";

function App() {
    function getBugsFromStorage(): Array<Bug> {
        return JSON.parse(localStorage.getItem("bugList") || "[]");
    }

    const [bugList, setBugList] = useState<Bug[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredBugList, setFilteredBugList] = useState<Bug[]>(bugList);
    const [status, setStatus] = useState<string>("all");

    function requestBugList(): void {
        const opts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(apiUrl, opts)
            .then((response) => response.json())
            .then((data) => {
                console.log("data:", data.data);
                setBugList(data.data);
            });
    }

    const handleFilterBugList = () => {
        switch (status) {
            case "OPEN":
                setFilteredBugList(
                    bugList.filter((bug: Bug) => {
                        if (searchTerm === "") return !bug.closed;
                        return (
                            !bug.closed &&
                            bug.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        );
                    })
                );
                break;
            case "CLOSED":
                setFilteredBugList(
                    bugList.filter((bug: Bug) => {
                        if (searchTerm === "") return bug.closed;
                        return (
                            bug.closed &&
                            bug.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        );
                    })
                );
                break;
            default:
                setFilteredBugList(
                    bugList.filter((bug: Bug) => {
                        return bug.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase());
                    })
                );
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
        requestBugList();
        console.log("bugList:", bugList);
    }, []);

    useEffect(() => {
        handleFilterBugList();
        if (bugList) {
            setLocalBugList();
        }
    }, [status, bugList]);

    useEffect(() => {
        handleFilterBugList();
    }, [searchTerm]);

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
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
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
