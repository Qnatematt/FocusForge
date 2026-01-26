let timeLeft = 25 * 60; // seconds
let timerInterval = null;
let running = false;

function startTimer() {
  console.log("Timer started");
  if (running) return; // prevents restarting
  running = true;

  document.getElementById("startBtn").addEventListener("click", startTimer);
  
  timerInterval = setInterval(() => {
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Session complete!");
      resetTimer();
    }
  }, 1000);
}
function resetTimer() {
  running = false;
  timeLeft = 25 * 60;
  document.getElementById("timer").textContent = "25:00";
  document.getElementById("startBtn").disabled = false;
}


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

window.addEventListener("beforeunload", (e) => {
  if (running) {
  e.preventDefault();
  e.returnValue = "";
  }
});
