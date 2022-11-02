import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BugList from "./Pages/BugList";
import BugDetail from "./Pages/BugDetail";
import Login from "./Pages/Login";

const apiUrl = "http://localhost:6969/";

function App(): React.ReactNode {
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
        fetch(apiUrl + "bug", opts)
            .then((response) => response.json())
            .then((data) => {
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
        <div className="App bg-cat-base text-cat-text">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route
                        path="/home"
                        element={
                            <BugList
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
