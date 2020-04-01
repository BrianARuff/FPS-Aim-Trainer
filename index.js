document.querySelector("#background");

let count = 0;
let countClick = 0;

function clearDots(ele) {
  setInterval(() => {
    ele.parentNode.removeChild(ele);
    clearInterval();
  }, 7000);
}

function moreDots() {
  for (let i = 0; i < 5; i++) {
    let dot = document.createElement("div");
    dot.setAttribute("class", "dot");
    dot.style.position = "absolute";
    dot.style.height = "25px";
    dot.style.width = "25px";
    let bottomPositon = Math.floor(
      Math.min(
        Math.random() *
          document.querySelector("#background").getBoundingClientRect().bottom,
        document.querySelector("#background").getBoundingClientRect().bottom -
          175
      )
    );
    let rightPosition = Math.min(
      Math.random() *
        document.querySelector("#background").getBoundingClientRect().right,
      document.querySelector("#background").getBoundingClientRect().right - 50
    );
    dot.style.bottom = bottomPositon + "px";
    dot.style.left = rightPosition + "px";
    document
      .querySelector("#background")
      .insertAdjacentElement("afterbegin", dot);
  }
  document.querySelectorAll(".dot").forEach(ele => {
    console.log(ele);
    ele.addEventListener("click", e => {
      console.log("dot click :)");
      e.target.parentNode.removeChild(e.target);
    });
    clearDots(ele);
  });
}

function handleDotsOnInteraction(e) {
  if (e.target.className !== "dot") {
    moreDots();
    document.querySelector("#dotCount").innerText = count += 5;
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
}

document.addEventListener("click", e => handleDotsOnInteraction(e));

/*** TODO's
  1. Add Timer
  2. Add Modes
***/
