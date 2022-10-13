import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface IBugEntryProps {
  bug: Bug;
  key: number;
}

const BugEntry: React.FC<IBugEntryProps> = ({ bug }) => {
  return (
    <div className="BugEntry text-cat-text">
      <h1>
        {bug.closed ? (
          <FontAwesomeIcon className="text-cat-red" icon={faCircleXmark} />
        ) : (
          <FontAwesomeIcon className="text-cat-green" icon={faCircle} />
        )}
        {" " + bug.title}
      </h1>
      <p>{bug.text}</p>
    </div>
  );
};

export default BugEntry;
