let timeLeft = 25 * 60; // seconds
let timerInterval = null;
let running = false;

function startTimer() {
  if (running) return; // prevents restarting
  running = true;

  document.getElementById("startBtn").disabled = true;
  document.getElementById("endBtn").disabled = false;

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

function endSession() {
  clearInterval(timerInterval);
  alert("Session ended early.");
  resetTimer();
}

function resetTimer() {
  running = false;
  timeLeft = 25 * 60;
  document.getElementById("timer").textContent = "25:00";
  document.getElementById("startBtn").disabled = false;
  document.getElementById("endBtn").disabled = true;
}
