import React from "react";
import { useState } from "react";
import BugEntry from "./BugEntry";

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

const BugList: React.FC = () => {
  const [bugList, setBugList] = useState<Bug[]>(testBugList);

  return (
    <div className="BugList flex">
      <div className="mt-10 mx-72 w-full border-solid border-2 border-cat-overlay0 rounded">
        <ul>
          {bugList.map((bug) => {
            return <BugEntry bug={bug} key={bug.id} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default BugList;
