
import { supabase } from "./supabase-client.js";

const statusElement = document.querySelector("#dashboard-status");
const completedElement = document.querySelector("#quizzes-completed");
const averageElement = document.querySelector("#average-score");
const bestElement = document.querySelector("#best-score");
const activityElement = document.querySelector("#recent-activity");
const signOutButton = document.querySelector("#sign-out-button");

function showStatus(message) {
  if (statusElement) {
    statusElement.textContent = message;
  }
}

function formatTopic(topic) {
  const topics = {
    all: "All Topics",
    cloud: "Cloud Concepts",
    architecture: "Azure Architecture",
    governance: "Governance",
  };

  return topics[topic] || topic || "General Practice";
}

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString();
}

function renderActivity(attempts) {
  if (!activityElement) return;

  activityElement.replaceChildren();

  const completedAttempts = attempts.filter(
    (attempt) => attempt.status === "completed"
  );

  if (completedAttempts.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent =
      "No completed quizzes yet. Start a quiz to begin your learning journey.";

    activityElement.appendChild(emptyMessage);
    return;
  }

  const list = document.createElement("ul");

  completedAttempts.forEach((attempt) => {
    const item = document.createElement("li");
    const topic = document.createElement("h3");
    const score = document.createElement("p");
    const date = document.createElement("p");

    topic.textContent = formatTopic(attempt.topic);
    score.textContent = `Score: ${attempt.score} points`;
    date.textContent = `Completed: ${formatDate(
      attempt.completed_at
    )}`;

    item.append(topic, score, date);
    list.appendChild(item);
  });

  activityElement.appendChild(list);
}

async function loadDashboard() {
  showStatus("Checking your session...");

  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) throw sessionError;

    if (!session) {
      window.location.replace("./signin.html");
      return;
    }

    showStatus("Loading your saved quiz attempts...");

    const { data: attempts, error } = await supabase
      .from("quiz_attempts")
      .select(
        "id, topic, score, status, started_at, completed_at"
      )
      .eq("user_id", session.user.id)
      .order("started_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    const completedAttempts = (attempts || []).filter(
      (attempt) => attempt.status === "completed"
    );

    if (completedElement) {
      completedElement.textContent = String(
        completedAttempts.length
      );
    }

    if (completedAttempts.length > 0) {
      const scores = completedAttempts.map(
        (attempt) => Number(attempt.score) || 0
      );

      const average =
        scores.reduce((total, score) => total + score, 0) /
        scores.length;

      if (averageElement) {
        averageElement.textContent = `${average.toFixed(1)} points`;
      }

      if (bestElement) {
        bestElement.textContent = `${Math.max(...scores)} points`;
      }
    } else {
      if (averageElement) averageElement.textContent = "—";
      if (bestElement) bestElement.textContent = "—";
    }

    renderActivity(attempts || []);

    showStatus("Your dashboard is up to date.");
  } catch (error) {
    console.error("Dashboard loading error:", error);

    showStatus(
      "We couldn't load your progress. Check your connection, database table, and Supabase permissions, then try again."
    );
  }
}

if (signOutButton) {
  signOutButton.addEventListener("click", async () => {
    signOutButton.disabled = true;
    showStatus("Signing out...");

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      window.location.replace("./signin.html");
    } catch (error) {
      console.error("Sign-out error:", error);
      showStatus("Sign-out failed. Please try again.");
      signOutButton.disabled = false;
    }
  });
}

loadDashboard();
