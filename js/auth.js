import { supabase } from "./supabase-client.js";

const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
const status = document.querySelector("#auth-status");

function showStatus(message) {
  if (status) {
    status.textContent = message;
  }
}

// SIGN UP PAGE
if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = signupForm.elements.email.value.trim();
    const password = signupForm.elements.password.value;
    const button = signupForm.querySelector('button[type="submit"]');

    showStatus("Creating your account...");

    if (button) button.disabled = true;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        showStatus(`Sign-up failed: ${error.message}`);
        return;
      }

      if (data.session) {
        showStatus("Account created successfully. Opening your quiz...");
        window.location.href = "./quiz.html";
        return;
      }

      showStatus(
        "Account request received. Check your email for a confirmation link if required. After confirming, sign in to continue."
      );
    } catch (error) {
      showStatus("Something went wrong. Please try again.");
      console.error("Sign-up error:", error);
    } finally {
      if (button) button.disabled = false;
    }
  });
}

// SIGN IN PAGE
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = loginForm.elements.email.value.trim();
    const password = loginForm.elements.password.value;
    const button = loginForm.querySelector('button[type="submit"]');

    showStatus("Signing in...");

    if (button) button.disabled = true;

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        showStatus(`Sign-in failed: ${error.message}`);
        return;
      }

      if (data.session) {
        showStatus("Signed in successfully. Opening your quiz...");
        window.location.href = "./quiz.html";
      } else {
        showStatus("No active session was returned. Please try again.");
      }
    } catch (error) {
      showStatus("Something went wrong. Please try again.");
      console.error("Sign-in error:", error);
    } finally {
      if (button) button.disabled = false;
    }
  });
}

console.info("CloudRecall AI: Authentication page initialized.");
