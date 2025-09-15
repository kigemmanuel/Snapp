import snapp from '../Snapp.js';

// Snapp/views/index.jsx
var App = () => {
  const loadInput = snapp.event("click", (e, param) => {
    console.log("Param: ", param);
  });
  const inputing = snapp.event("input", (e, param) => {
    console.log(e.target.value);
    console.log(param);
  });
  const btn = /* @__PURE__ */ snapp.create(
    "button",
    {
      event: [loadInput, { msg: "ok" }],
      ondblclick: (e) => console.log(e),
      onclick: () => {
        console.log("Click");
      }
    },
    "Hello People ooo"
  );
  snapp.on("DOM", () => {
    const [oldBtn, okDiv] = snapp.select(["#name", "#okok"]);
    okDiv.innerHTML = "Snapp snapp";
    snapp.remove([oldBtn, loadInput], true);
    setTimeout(() => {
      snapp.render(oldBtn, btn, "replace");
    }, 200);
  });
  function name(params) {
    console.log(params);
  }
  return /* @__PURE__ */ snapp.create("<>", null, /* @__PURE__ */ snapp.create("div", { className: "result" }, "Woooooo"), /* @__PURE__ */ snapp.create(
    "input",
    {
      event: [
        [loadInput, { msg: "Hello World" }],
        [inputing, { id: 300 }]
      ],
      type: "text",
      id: "name"
    }
  ), /* @__PURE__ */ snapp.create("div", { id: "wow" }, /* @__PURE__ */ snapp.create("button", { id: "okok", event: [loadInput, { key: "Wow" }] }, "Hello Button")), /* @__PURE__ */ snapp.create(
    "button",
    {
      id: "hey",
      event: [
        [loadInput, { msg: "ok" }]
      ],
      ondblclick: (e) => console.log("double click"),
      onclick: () => {
        console.log("Click");
      }
    },
    "Hello People"
  ));
};
var index_default = App;
export {
  index_default as default
};
