import { useHistory } from "react-router-dom";

const Menu = () => {
    const options = ["Alphabetical", "Random"];
    const { push } = useHistory();

    return(
        <div className="home-container">
            {options.map( (option, index) => {
                if (option === "Random") {
                    return <button key={index} onClick={() => push("/random-board")}>{option}</button>
                }
                if (option === "Alphabetical") {
                    return  <button key={index} onClick={() => push("/alphabetical-board")}>{option}</button>
                }else {
                    return option
                }
            })}
        </div>
    )
};

export default Menu;
