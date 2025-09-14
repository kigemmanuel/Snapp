import { Button } from "./components/Button.jsx";

const App = () => {
    const loadInput = snapp.event("loadInput", "click", (e, param) => {
        console.log("Param: ", param)
    })

    const inputing = snapp.event("loadInput", "input", (e, param) => {
        console.log(e.target.value)
        console.log(param.id)
    })

    const btn = <button event={{click: [loadInput, {key: "Wow"}]}}>Hello Button</button>;

    snapp.on("DOM", () => {
        const body = snapp.select("#wow")
        snapp.render(body, btn)
    })

    function name(params) {
        console.log(params)
    }

    return (
        <>
        <div className="result">Woooooo</div>
        <input 
            event={{
                click: [loadInput, {msg: "Hello World"}],
                input: [inputing, {id: 300}]
            }}
            type="text" id="name"
        />
        <div id="wow">
            <button on="okok" event={{click: [loadInput, {key: "Wow"}]}}>Hello Button</button>
        </div>
        <button onclick={() => name("Working......!")}>Hello People</button>
        </>
    );
};

export default App;