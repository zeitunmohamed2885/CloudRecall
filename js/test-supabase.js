
import { supabase } from "./supabase-client.js";

async function diagnoseSupabase() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error("Session check failed:", sessionError.message);
    return;
  }

  console.log(
    "Signed-in user:",
    sessionData.session?.user?.id ?? "No active session"
  );

  const { data, error } = await supabase
    .from("quiz_questions")
    .select("id, topic, question")
    .limit(3);

  if (error) {
    console.error("Question query failed:", {
      message: error.message,
      code: error.code,
      status: error.status
    });
    return;
  }

  console.log("Question query successful!");
  console.table(data);
}

diagnoseSupabase();
