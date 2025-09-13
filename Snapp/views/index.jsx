
import { Button, FullButton } from "./component/Button";

const App = () => {
    const hello = "Hello Workd";
    const chk = "<h1>Hello</h1>";
    const btn = <Button type={300 * 500}>Click Me</Button>

    return (
        <>
            <Hello id={hello} /> 400 {btn}
            <Div>
                <FullButton>
                    Hello Fragment {chk}
                </FullButton>
            </Div>
        </>
    );
};

const Div = (props) => {
    return (
        <div class="name">
            {props.props}
        </div>
    )
}

const Hello = (props) => {

    const text = [1, 2, 3, 4, 5]

    return (
        <h1 id={props.id} props={30 + 400}>
            Hello Every Emmanuel
            {text.map(val => {
                return val
            })}
        </h1>
    );
};

export default App;