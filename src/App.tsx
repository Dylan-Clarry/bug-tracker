import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BugPage from "./Pages/BugPage";

function App() {
    return (
        <div className="App h-screen bg-cat-base text-cat-text">
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<Home />} />
                    <Route path="/bug/:id" element={<BugPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
