const bg = document.querySelector("#background");

let count = 0;
let countClick = 0;
let dotTime;

function clearDots(ele) {
  const deleteDotsInterval = setInterval(() => {
    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
    clearInterval(deleteDotsInterval);
  }, dotTime);
}

function moreDots() {
  for (let i = 0; i < 5; i++) {
    let dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.classList.add("dot");
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
    ele.addEventListener("click", e => {
      e.target.parentNode.removeChild(e.target);
    });
    clearDots(ele);
  });
}

function handleDotsOnInteraction(e) {
  if (e.target.className === "dot") {
    document.querySelector("#countClick").innerText = countClick += 1;
  }
}

document.addEventListener("click", e => handleDotsOnInteraction(e));

function playGame() {
  let mode = document.querySelectorAll("input[name=mode]:checked")[0];
  document.querySelector("#countDown").innerText = mode.value;
  console.log(mode.id);
  if (mode.id === "easy") {
    dotTime = 10000;
  } else if (mode.id === "medium") {
    dotTime = 7000;
  } else if (mode.id === "hard") {
    dotTime = 5000;
  } else {
    dotTime = 3000;
  }

  const countDownTimer = setInterval(() => {
    document.querySelector("#countDown").innerText =
      Number(document.querySelector("#countDown").innerText) - 1;

    setTimeout(() => {
      document.querySelector("#gameTimer").innerText =
        Number(document.querySelector("#gameTimer").innerText) - 1;
    }, dotTime);
  }, 1000);

  const dotSpawner = setInterval(() => {
    document.querySelector("#countDown").innerText = mode.value;
    moreDots();
    document.querySelector("#dotCount").innerText =
      Number(document.querySelector("#dotCount").innerText) + 5;
  }, dotTime);

  const clearDotSpawner = setInterval(() => {
    clearInterval(dotSpawner);
    clearInterval(countDownTimer);
    clearInterval(clearDotSpawner);
  }, 60000);
}

document.querySelector("#startGame").addEventListener("click", e => {
  e.target.parentNode.removeChild(e.target);
  document.querySelector("#countDown").style.display = "block";
  playGame();
});

/*** TODO's
  1. Add Timer -- COMPLETED
  2. Add Modes -- COMPLETED
  3. Add Sounds
***/
