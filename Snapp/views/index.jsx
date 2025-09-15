import { Button } from "./components/Button.jsx";

const App = () => {
    const loadInput = snapp.event("click", (e, param) => {
        console.log("Param: ", param)
    })

    const inputing = snapp.event("input", (e, param) => {
        console.log(e.target.value)
        console.log(param)
    })

    const btn = <button 
            event={
                [loadInput, {msg: "ok"}]
            }
        ondblclick={e => console.log(e)} onclick={() => {console.log("Click")}}>Hello People ooo</button>;

    snapp.on("DOM", () => {

        const [oldBtn, okDiv] = snapp.select(["#name", "#okok"])
        okDiv.innerHTML = "Snapp snapp";

        snapp.remove([oldBtn, loadInput], true)

        setTimeout(() => {
            snapp.render(oldBtn, btn, "replace")
        }, 200)
    })

    function name(params) {
        console.log(params)
    }

    return (
        <>
        <div className="result">Woooooo</div>
        <input 
            event={[
                [loadInput, {msg: "Hello World"}],
                [inputing, {id: 300}]
            ]}
            type="text" id="name"
        />
        <div id="wow">
            <button id="okok" event={[loadInput, {key: "Wow"}]}>Hello Button</button>
        </div>
        <button id="hey"
            event={[
                [loadInput, {msg: "ok"}]
            ]}
        ondblclick={e => console.log('double click')} onclick={() => {console.log("Click")}}>Hello People</button>
        </>
    );
};

export default App;