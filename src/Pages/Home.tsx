import React, { SetStateAction } from "react";
import BugList from "../Components/BugList";
import Form from "../Components/Form";

interface IHomeProps {
    bugList: Bug[];
    setBugList: React.Dispatch<SetStateAction<Bug[]>>;
}

const Home: React.FC<IHomeProps> = ({ bugList, setBugList }) => {
    return (
        <div className="Home">
            <Form bugList={bugList} setBugList={setBugList} />
            <BugList bugList={bugList} setBugList={setBugList} />
        </div>
    );
};

export default Home;
