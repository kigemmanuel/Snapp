import snapp from '../Snapp.js';

// Snapp/views/index.jsx
var App = () => {
  const darkMode = true;
  const style = snapp.css({
    color: darkMode ? "white" : "black",
    "background-color": darkMode ? "black" : "white",
    "padding": "20px",
    border: "1px solid black"
  });
  return /* @__PURE__ */ snapp.create("<>", null, /* @__PURE__ */ snapp.create("h2", { css: style, id: "ij" }, "Hello Snapp"));
};
var index_default = App;
export {
  index_default as default
};
