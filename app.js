const STUDY_TIME = 25 * 60; // seconds
let timerInterval = null;

document.addEventListener("DOMContentLoaded", () => {
 const startBtn = document.getElementById("startBtn");
 const timerDisplay = document.getElementById("timer");

 startBtn.addEventListener("click", startTimer);

 // Resume timer if page was reloaded
 if (localStorage.getItem("endTime")) {
   startBtn.disabled = true;
   runTimer(timerDisplay, startBtn);
  }
});

function startTimer() {
 if (localStorage.getItem("endTime")) return;

 const endTime = Date.now() + STUDY_TIME * 1000;
 localStorage.setItem("endTime", endTime);

 const startBtn = document.getElementById("startBtn");
 const timerDisplay = document.getElementById("timer");

 startBtn.disabled = true;
 runTimer(timerDisplay, startBtn);
}

function runTimer(timerDisplay, startBtn) {
 clearInterval(timerInterval);

 timerInterval = setInterval(() => {
   const endTime = localStorage.getItem("endTime");
   if (!endTime) return;

   const timeLeft = Math.max(
     0,
     Math.floor((endTime - Date.now()) / 1000)
   );

   const minutes = Math.floor(timeLeft / 60);
   const seconds = timeLeft % 60;

   timerDisplay.textContent =
     `${minutes}:${seconds.toString().padStart(2, "0")}`;

   if (timeLeft <= 0) {
     clearInterval(timerInterval);
     localStorage.removeItem("endTime");
     alert("Session complete!");
     startBtn.disabled = false;
     timerDisplay.textContent = "25:00";
   }
 }, 1000);
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
