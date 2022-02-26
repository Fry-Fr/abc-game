import { useNavigate } from "react-router-dom";

const Menu = () => {
    const options = ["Alphabetical", "Random"];
    const navigate = useNavigate();

    return(
        <div className="home-container">
            {options.map( (option, index) => {
                if (option === "Random") {
                    return <button key={index} onClick={() => navigate("/random-board")}>{option}</button>
                }
                if (option === "Alphabetical") {
                    return  <button key={index} onClick={() => navigate("/alphabetical-board")}>{option}</button>
                }else {
                    return option
                }
            })}
        </div>
    )
};

export default Menu;
