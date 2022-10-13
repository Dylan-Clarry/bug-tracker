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
    <div className="BugList flex">
      <div className="mt-10 mx-72 w-full border-solid border-2 border-cat-overlay0 rounded">
        <ul>
          {testBugList.map((bug) => {
            return <BugEntry bug={bug} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default BugList;
