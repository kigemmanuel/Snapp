import snapp from '../Snapp.js';

// Snapp/views/index.jsx
var App = () => {
  const loadInput = snapp.event("loadInput", "click", (e, param) => {
    console.log("Param: ", param);
  });
  const inputing = snapp.event("loadInput", "input", (e, param) => {
    console.log(e.target.value);
    console.log(param.id);
  });
  const btn = /* @__PURE__ */ snapp.create("button", { event: { click: [loadInput, { key: "Wow" }] } }, "Hello Button");
  snapp.on("DOM", () => {
    const body = snapp.select("#wow");
    snapp.render(body, btn);
  });
  function name(params) {
    console.log(params);
  }
  return /* @__PURE__ */ snapp.create("<>", null, /* @__PURE__ */ snapp.create("div", { className: "result" }, "Woooooo"), /* @__PURE__ */ snapp.create(
    "input",
    {
      event: {
        click: [loadInput, { msg: "Hello World" }],
        input: [inputing, { id: 300 }]
      },
      type: "text",
      id: "name"
    }
  ), /* @__PURE__ */ snapp.create("div", { id: "wow" }, /* @__PURE__ */ snapp.create("button", { on: "okok", event: { click: [loadInput, { key: "Wow" }] } }, "Hello Button")), /* @__PURE__ */ snapp.create("button", { onclick: () => name("Working......!") }, "Hello People"));
};
var index_default = App;
export {
  index_default as default
};
