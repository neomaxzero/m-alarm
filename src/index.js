import "./styles.css";

let alarmTimeout, alarmTwoTimeout;

let state = {
  running: false
};

const box = document.getElementById("box");
const timerBtn = document.getElementById("timer-btn");
const timerInput = document.getElementById("timer-input");
const presetButtons = document.querySelectorAll(".preset-btn");

function alarm() {
  const timer = timerInput.value;
  console.log(timer);

  alarmTwoTimeout = setTimeout(() => {
    box.classList.add("ring");

    let a = true;
    alarmTimeout = setInterval(() => {
      if (a) {
        box.classList.add("ring");
        box.classList.remove("ring-2");
      } else {
        box.classList.add("ring-2");
        box.classList.remove("ring");
      }
      a = !a;
    }, 500);
  }, timer);
}

presetButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("value");
    timerInput.value = value;
  });
});

timerBtn.addEventListener("click", () => {
  if (state.running) {
    state.running = false;
    clearInterval(alarmTimeout);
    clearTimeout(alarmTwoTimeout);
    timerBtn.innerHTML = "Start timer";
    box.classList.remove("ring-2", "ring");
  } else {
    state.running = true;
    alarm();
    timerBtn.innerHTML = "STOP!";
  }
});
// alarm(5000);
