CloudRecall
Practice & Assessment: Smart Quiz Builder for AZ-900

CloudRecall is a web-based quiz practice project designed to help
learners prepare for Microsoft Azure Fundamentals (AZ-900). It organizes
practice by topic and gives learners immediate feedback as they answer
questions, helping them review their understanding rather than simply
memorizing answers.
The problem
Many learners practise with questions but do not understand why an
answer is right or wrong.
The challenge
Build a quiz app that gives instant feedback and clear explanations for
every answer, organized by AZ-900 topic.
Project goals
- Provide a simple, accessible way to practise AZ-900 concepts.
- Organize questions into topic areas.
- Give immediate feedback after an answer.
- Show quiz progress and a final score.
- Develop toward account-based progress tracking so learners can
  return to their learning.
Current features
Based on the current project implementation and manual tests:
- Homepage introducing CloudRecall and the learning experience.
- Separate sign-up and sign-in pages using Supabase Authentication.
- Quiz page with topic filtering for All Topics, Cloud, Architecture,
  and Governance.
- Question counter and progress bar.
- Answer feedback, final results, score display, and a practise-again
  flow.
- Dashboard page structure for quiz statistics and recent activity.
- Navigation between the homepage, authentication pages, quiz, and
  dashboard.
Technology
- HTML
- CSS
- JavaScript using ES modules
- Supabase Authentication and planned database-backed progress storage
Project status
This is a work in progress. The quiz interface and its main interaction
flow have been manually tested. At the time this README was written:
- The quiz questions are still hardcoded in the frontend.
- The dashboard UI is in place, and its script attempts to read the
  quiz_attempts table for the signed-in user.
- Quiz attempts and answers are not yet reliably saved from the quiz
  flow to Supabase, so dashboard statistics may remain empty.
- Supabase email sign-up testing encountered an email rate-limit
  error. Authentication email configuration may need further setup
  before testing registration end-to-end.
These limitations are listed intentionally so the repository describes
the current implementation accurately.
Getting started
1. Clone or download the repository.
2. Open the project folder in your code editor.
3. Confirm that the Supabase project URL and publishable key are
   configured in js/supabase-client.js. Use your own project's
   publishable key; never commit service-role keys or other secrets.
4. Serve the folder through a local development server. Because the
   JavaScript files use ES modules, avoid relying on opening the HTML
   files directly with a file:// URL.
5. Open index.html through the local server.
6. Test the homepage, topic links, quiz flow, sign-up/sign-in pages,
   and dashboard.
Do not commit private keys, passwords, SMTP credentials, or real user
data. If a key has been accidentally exposed, rotate it in the
relevant service.

Suggested project structure
cloudrecall/
├── index.html
├── signup.html
├── signin.html
├── quiz.html
├── dashboard.html
├── css/
│   ├── main.css
│   ├── components.css
│   ├── pages.css
│   └── responsive.css
└── js/
    ├── main.js
    ├── navigation.js
    ├── auth.js
    ├── quiz.js
    ├── quiz-page.js
    ├── dashboard.js
    └── supabase-client.js
This is an expected structure based on the current page setup; adjust it
if your repository differs.
Roadmap
- [ ] Confirm Supabase authentication works end-to-end.
- [ ] Move quiz questions to the database.
- [ ] Ensure each question includes a correct answer and a clear
  explanation.
- [ ] Save quiz attempts and answers to Supabase.
- [ ] Restore a learner's progress after signing out and signing back
  in.
- [ ] Connect dashboard statistics to real saved attempts.
- [ ] Improve error handling, accessibility, and responsive behavior.
- [ ] Add automated tests and screenshots for the repository.
Why CloudRecall?
CloudRecall is built around a simple learning principle: practice is
more useful when learners understand the reasoning behind an answer. The
project aims to make AZ-900 revision more structured, informative, and
trackable.
Contributing
This is an evolving learning project. Suggestions, bug reports, and
contributions that improve the learning experience are welcome. Please
describe the issue or proposed change clearly.
Disclaimer
CloudRecall is an independent practice project and is not affiliated
with or endorsed by Microsoft. AZ-900 exam objectives and cloud services
can change, so learners should also consult official Microsoft learning
resources.
