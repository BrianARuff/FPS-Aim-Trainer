document.querySelector("#background");

let count = 1;
let countClick = 0;

function moreDots() {
  const bg = document.querySelector("#background");
  for (let i = 0; i < 10; i++) {
    let dot = document.createElement("div");
    dot.setAttribute("class", "dot");
    dot.style.position = "absolute";
    dot.style.height = "25px";
    dot.style.width = "25px";
    dot.style.top = Math.random() * bg.getBoundingClientRect().bottom + "px";
    dot.style.left = Math.random() * bg.getBoundingClientRect().right + "px";
    dot.style.zIndex = "1001";
    document
      .querySelector("#background")
      .insertAdjacentElement("afterbegin", dot);
  }
  document.querySelectorAll(".dot").forEach(ele => {
    ele.addEventListener("click", e => {
      console.log("dot click :)");
      e.target.parentNode.removeChild(e.target);
    });
  });
}

document.addEventListener("click", e => {
  if (e.target.className !== "dot") {
    moreDots();
    document.querySelector("#dotCount").innerText = count += 10;
  }
  if (
    e.target.className !== "dot" &&
    document.querySelector(".dot").length < 1
  ) {
    console.log("click a  blank spot for more dots to appear :) ");
    document.querySelector("#dotCount").innerText = count -= 1;
    console.log(countClick);
  }
  if (e.target.className === "dot") {
    document.querySelector("#countClick").innerText = countClick += 1;
  }
});

/*** TODO's
  1. Add Timer
  2. Add Modes
***/
