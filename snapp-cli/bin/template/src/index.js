import snapp from "../snapp.js";

// views/index.jsx
var App = () => {
  return /* @__PURE__ */ snapp.create("<>", null, /* @__PURE__ */ snapp.create("h2", null, "Hello Snapp"));
};
var snappBody = document.querySelector("#snapp-body");
snapp.render(snappBody, App());
