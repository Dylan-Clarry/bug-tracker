import React from "react";
import BugEntry from "./BugEntry";

const testBugList: Bug[] = [
  {
    id: 1,
    title: "Test Bug",
    text: "This is a test and you failed the test!!!",
    closed: false,
  },
];

const BugList: React.FC = () => {
  return (
    <div className="BugList">
      <h1>BugList</h1>
      <ul>
        {testBugList.map((bug) => {
          return <BugEntry bug={bug} />;
        })}
      </ul>
    </div>
  );
};

export default BugList;
