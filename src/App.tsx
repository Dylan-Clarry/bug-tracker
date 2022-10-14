import { Route } from "wouter";
import Home from "./Pages/Home";
import BugPage from "./Pages/BugPage";

function App() {
    return (
        <div className="App h-screen bg-cat-base text-cat-text">
            <Route path="/" component={Home} />
            <Route path="/bug/:id" component={BugPage} />
        </div>
    );
}

export default App;
