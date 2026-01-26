const STUDY_TIME = 25 * 60; // seconds
let timerInterval = null;

document.addEventListener("DOMContentLoaded", () => {
 const startBtn = document.getElementById("startBtn");
 const timerDisplay = document.getElementById("timer");
 const taskInput = document.getElementById("taskInput");
 const currentTask = document.getElementById("currentTask");

 // Enable Start only when task is entered
 taskInput.addEventListener("input", () => {
  startBtn.disabled = taskInput.value.trim() === "";
 });

 startBtn.addEventListener("click", () => startSession());

 // Resume session after reload
 if (localStorage.getItem("endTime")) {
  startBtn.disabled = true;
  taskInput.disabled = true;
  currentTask.textContent = "Task: " + localStorage.getItem("task");
  runTimer(timerDisplay, startBtn, taskInput, currentTask);
 }
});

function startSession() {
 const taskInput = document.getElementById("taskInput");
 const startBtn = document.getElementById("startBtn");
 const timerDisplay = document.getElementById("timer");
 const currentTask = document.getElementById("currentTask");

 const task = taskInput.value.trim();
 if (!task) return;

 const endTime = Date.now() + STUDY_TIME * 1000;
 localStorage.setItem("endTime", endTime);
 localStorage.setItem("task", task);

 taskInput.disabled = true;
 startBtn.disabled = true;
 currentTask.textContent = "Task: " + task;

 runTimer(timerDisplay, startBtn, taskInput, currentTask);
}

function runTimer(timerDisplay, startBtn, taskInput, currentTask) {
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
   localStorage.clear();

   alert("Session complete!");

   timerDisplay.textContent = "25:00";
   currentTask.textContent = "";
   taskInput.value = "";
   taskInput.disabled = false;
   startBtn.disabled = true;
  }
 }, 1000);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

window.addEventListener("beforeunload", (e) => {
  if (running) {
  e.preventDefault();
  e.returnValue = "";
  }
});
