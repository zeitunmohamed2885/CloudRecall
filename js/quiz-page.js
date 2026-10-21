
import { initNavigation } from "./navigation.js";
import { initQuiz } from "./quiz.js";

function initQuizPage() {
  initNavigation();

  const topicSelect = document.querySelector("#topic-select");
  const allowedTopics = [
    "all",
    "cloud",
    "architecture",
    "governance",
  ];

  const requestedTopic = new URLSearchParams(
    window.location.search
  ).get("topic");

  if (
    topicSelect &&
    requestedTopic &&
    allowedTopics.includes(requestedTopic)
  ) {
    topicSelect.value = requestedTopic;
  }

  initQuiz();

  console.info("CloudRecall AI: Quiz page initialized.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuizPage, {
    once: true,
  });
} else {
  initQuizPage();
}
