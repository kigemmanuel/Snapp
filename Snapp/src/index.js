import Snapp from './Snapp.js';

// Snapp/views/component/Button.jsx
var FullButton = (props) => {
  return /* @__PURE__ */ Snapp.create("<>", null, props.props, /* @__PURE__ */ Snapp.create("h1", null, "Ok"), "Hello World", /* @__PURE__ */ Snapp.create("button", null, "HEy"));
};
var Button = (props) => {
  return /* @__PURE__ */ Snapp.create("button", null, "ggg", props.type);
};

// Snapp/views/index.jsx
var App = () => {
  const hello = "Hello Workd";
  const chk = "<h1>Hello</h1>";
  const btn = /* @__PURE__ */ Snapp.create(Button, null);
  return /* @__PURE__ */ Snapp.create("div", null, /* @__PURE__ */ Snapp.create(Hello, { id: hello }), " 400 ", btn, /* @__PURE__ */ Snapp.create(Div, null, " jjjj", /* @__PURE__ */ Snapp.create(FullButton, null, "Hello Fragment ", chk)));
};
var Div = (props) => {
  return /* @__PURE__ */ Snapp.create("div", { class: "name" }, props.props);
};
var Hello = (props) => {
  const text = [1, 2, 3, 4, 5];
  return /* @__PURE__ */ Snapp.create("h1", { id: props.id, props: 30 + 400 }, "Hello Every Emmanuel", text.map((val) => {
    return val;
  }));
};
var index_default = App;
export {
  index_default as default
};
