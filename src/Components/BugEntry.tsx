import React from "react";

interface IBugEntryProps {
  bug: Bug;
}

const BugEntry: React.FC<IBugEntryProps> = ({ bug }) => {
  return (
    <div className="BugEntry">
      <h2>Bug Entry</h2>
      <ul className="">
        <li>{bug.title}</li>
        <li>{bug.text}</li>
        <li>{bug.closed}</li>
      </ul>
    </div>
  );
};

export default BugEntry;
