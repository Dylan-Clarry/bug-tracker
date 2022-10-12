import React from "react";
import BugEntry from "./BugEntry";

const BugList: React.FC = () => {
  return (
    <div className="BugList">
      <h1>BugList</h1>
      <BugEntry />
      <BugEntry />
      <BugEntry />
    </div>
  );
};

export default BugList;
