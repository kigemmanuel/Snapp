import { Button } from "./components/Button.jsx";

const App = () => {

    const darkMode = true;

    const style = snapp.css({
        color: darkMode ? "white" : "black",
        "background-color": darkMode ? "black" : "white",
        "padding": "20px",
        border: "1px solid black"
    })

    return (
        <>
        <h2 css={style} id="ij">Hello Snapp, Hey Emmanule</h2>
        </>
    )
};

export default App;