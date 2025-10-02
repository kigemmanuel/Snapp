import snapp from "./snapp.js";

// views/components/Button.jsx
var Button = ({ props, count }) => {
  const hover = snapp.dynamic(false);
  const btnStyle = {
    "background-color": () => hover.value ? "#357abd" : "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.2s",
    "transform": () => hover.value ? "translateY(-2px)" : "none"
  };
  return /* @__PURE__ */ snapp.create(
    "button",
    {
      style: btnStyle,
      onClick: () => count.update(count.value + 1),
      onMouseEnter: () => hover.update(true),
      onMouseLeave: () => hover.update(false)
    },
    props
  );
};
var Button_default = Button;

// views/index.jsx
var App = () => {
  const centerDiv = {
    position: "absolute",
    display: "grid",
    "place-items": "center",
    top: "50%",
    left: "50%",
    width: "100%",
    transform: "translate(-50%, -50%)"
  };
  const aHref = {
    marginTop: "10px",
    color: "#4a90e2",
    textDecoration: "none",
    "font-weight": "bold"
  };
  const count = snapp.dynamic(0);
  return /* @__PURE__ */ snapp.create("div", { style: centerDiv }, /* @__PURE__ */ snapp.create("img", { style: { width: "auto", height: "200px" }, src: "assets/snapp.png", alt: "" }), /* @__PURE__ */ snapp.create("h2", null, "Welcome to snapp: ", () => count.value), /* @__PURE__ */ snapp.create(Button_default, { count }, "Click To Count"), /* @__PURE__ */ snapp.create("br", null), /* @__PURE__ */ snapp.create("a", { style: aHref, target: "_blank", href: "https://github.com/kigemmanuel/Snapp" }, "Learn Snapp"), /* @__PURE__ */ snapp.create("span", { style: { ...aHref, color: "#0C2340" } }, "Please star and follow"));
};
var SnappBody = document.querySelector("#snapp-body");
snapp.render(SnappBody, App());
