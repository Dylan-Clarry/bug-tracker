import React from "react";
import { useLocation } from "react-router-dom";

const BugPage: React.FC = () => {
    const state = useLocation().state;
    const bug: Bug = state.bug;

    return <div>{bug.title}</div>;
};

export default BugPage;
