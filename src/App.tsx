import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BugPage from "./Pages/BugPage";

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

    return (
        <div className="App h-screen bg-cat-base text-cat-text">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home bugList={bugList} setBugList={setBugList} />
                        }
                    />
                    <Route
                        path="/bug/:id"
                        element={
                            <BugPage
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
