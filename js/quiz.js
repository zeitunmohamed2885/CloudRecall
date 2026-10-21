
/* ============================================================
   CloudRecall AI — AZ-900 Practice Quiz
   ============================================================ */

const QUESTIONS = [
  {
    topic: "cloud",
    topicLabel: "Cloud concepts",
    question:
      "Which cloud benefit describes increasing or decreasing resources to meet demand?",
    options: [
      "High availability",
      "Elasticity",
      "Disaster recovery",
      "Fault tolerance",
    ],
    answer: 1,
    explanation:
      "Elasticity means resources can expand or shrink as demand changes. High availability focuses on keeping services accessible, disaster recovery focuses on restoring services after a major disruption, and fault tolerance helps a system continue operating when a component fails.",
  },
  {
    topic: "cloud",
    topicLabel: "Cloud concepts",
    question:
      "Which cloud model combines on-premises infrastructure with public cloud services?",
    options: [
      "Public cloud",
      "Private cloud",
      "Hybrid cloud",
      "Community cloud",
    ],
    answer: 2,
    explanation:
      "A hybrid cloud combines private or on-premises infrastructure with public cloud services, allowing an organization to use both environments.",
  },
  {
    topic: "cloud",
    topicLabel: "Cloud concepts",
    question:
      "In a consumption-based pricing model, what generally determines the amount a customer pays?",
    options: [
      "The number of employees in the company",
      "The age of the organization",
      "The resources and services consumed",
      "A fixed fee regardless of usage",
    ],
    answer: 2,
    explanation:
      "Consumption-based pricing generally charges for the services or resources used. The exact pricing rules depend on the service and its pricing model.",
  },
  {
    topic: "architecture",
    topicLabel: "Azure architecture and services",
    question:
      "What is an Azure region?",
    options: [
      "A group of users assigned to a subscription",
      "A geographical area containing one or more Azure datacenters",
      "A tool used only to monitor costs",
      "A type of virtual machine",
    ],
    answer: 1,
    explanation:
      "An Azure region is a geographical area containing one or more datacenters connected through a network. Region selection can affect latency, availability options, and data residency requirements.",
  },
  {
    topic: "architecture",
    topicLabel: "Azure architecture and services",
    question:
      "Which Azure service provides virtual machines for running operating systems and applications?",
    options: [
      "Azure Virtual Machines",
      "Azure Policy",
      "Microsoft Purview",
      "Azure Cost Management",
    ],
    answer: 0,
    explanation:
      "Azure Virtual Machines provides virtualized computing resources on which you can run supported operating systems and applications. The other options focus on governance, data governance, and cost management.",
  },
  {
    topic: "architecture",
    topicLabel: "Azure architecture and services",
    question:
      "What is the primary purpose of an Azure availability zone?",
    options: [
      "To create billing invoices",
      "To organize users into security groups",
      "To provide physically separate datacenter locations within a region",
      "To replace every Azure region",
    ],
    answer: 2,
    explanation:
      "Availability zones are physically separate locations within an Azure region, with independent infrastructure designed to help protect workloads against certain datacenter-level failures. Not every region or service supports zones.",
  },
  {
    topic: "governance",
    topicLabel: "Azure management and governance",
    question:
      "Which Azure service helps enforce organizational rules on resources, such as permitted locations?",
    options: [
      "Azure Monitor",
      "Azure Policy",
      "Azure Virtual Network",
      "Azure Functions",
    ],
    answer: 1,
    explanation:
      "Azure Policy evaluates resources against defined rules and can audit or enforce organizational requirements. Azure Monitor focuses on monitoring, Virtual Network provides network connectivity, and Azure Functions runs event-driven code.",
  },
  {
    topic: "governance",
    topicLabel: "Azure management and governance",
    question:
      "Which tool helps analyze, monitor, and manage Azure spending?",
    options: [
      "Azure Cost Management",
      "Azure DNS",
      "Azure Bastion",
      "Azure Load Balancer",
    ],
    answer: 0,
    explanation:
      "Azure Cost Management provides tools for analyzing, monitoring, and managing cloud expenditure. The other services handle name resolution, secure VM connectivity, and traffic distribution.",
  },
  {
    topic: "governance",
    topicLabel: "Azure management and governance",
    question:
      "What is the main purpose of resource locks in Azure?",
    options: [
      "To encrypt all files automatically",
      "To stop all users from signing in",
      "To help prevent accidental deletion or modification of resources",
      "To increase virtual machine processing speed",
    ],
    answer: 2,
    explanation:
      "Azure resource locks help protect resources from accidental deletion or modification. A CanNotDelete lock prevents deletion, while a ReadOnly lock prevents changes. Permissions and other security controls still matter.",
  },
];

const TOPIC_LABELS = {
  cloud: "Cloud concepts",
  architecture: "Azure architecture and services",
  governance: "Azure management and governance",
};

export function initQuiz() {
  const elements = {
    setup: document.getElementById("quiz-setup"),
    topicSelect: document.getElementById("topic-select"),
    startButton: document.getElementById("start-quiz"),
    content: document.getElementById("quiz-content"),
    counter: document.getElementById("question-counter"),
    topic: document.getElementById("question-topic"),
    progress: document.getElementById("quiz-progress"),
    progressBar: document.getElementById("quiz-progress-bar"),
    question: document.getElementById("question-text"),
    form: document.getElementById("answer-form"),
    fieldset: document.getElementById("answer-fieldset"),
    options: document.getElementById("answer-options"),
    feedback: document.getElementById("answer-feedback"),
    submitButton: document.getElementById("submit-answer"),
    nextButton: document.getElementById("next-question"),
    results: document.getElementById("quiz-results"),
    resultsSummary: document.getElementById("results-summary"),
    resultsMessage: document.getElementById("results-message"),
    restartButton: document.getElementById("restart-quiz"),
  };

  // Fail clearly if the HTML and JavaScript are out of sync.
  const missingElements = Object.entries(elements)
    .filter(([, element]) => !element)
    .map(([name]) => name);

  if (missingElements.length > 0) {
    console.error(
      "CloudRecall AI: Missing quiz HTML elements:",
      missingElements.join(", ")
    );
    return;
  }

  let sessionQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  function startQuiz() {
    const selectedTopic = elements.topicSelect.value;

    sessionQuestions =
      selectedTopic === "all"
        ? [...QUESTIONS]
        : QUESTIONS.filter(
            (question) => question.topic === selectedTopic
          );

    if (sessionQuestions.length === 0) {
      console.error("CloudRecall AI: No questions found for this topic.");
      return;
    }

    currentIndex = 0;
    score = 0;
    answered = false;

    elements.setup.hidden = true;
    elements.results.hidden = true;
    elements.content.hidden = false;

    renderQuestion();
  }

  function renderQuestion() {
    const question = sessionQuestions[currentIndex];

    answered = false;

    elements.counter.textContent =
      `Question ${currentIndex + 1} of ${sessionQuestions.length}`;

    elements.topic.textContent = question.topicLabel;
    elements.question.textContent = question.question;
    elements.options.replaceChildren();

    elements.feedback.hidden = true;
    elements.feedback.textContent = "";
    elements.feedback.classList.remove(
      "answer-feedback--correct",
      "answer-feedback--incorrect"
    );

    elements.fieldset.disabled = false;
    elements.submitButton.hidden = false;
    elements.submitButton.disabled = false;
    elements.nextButton.hidden = true;

    question.options.forEach((option, index) => {
      const label = document.createElement("label");
      label.className = "answer-option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = String(index);
      input.required = true;

      const text = document.createElement("span");
      text.textContent = option;

      label.append(input, text);
      elements.options.append(label);
    });

    const progress = Math.round(
      (currentIndex / sessionQuestions.length) * 100
    );

    elements.progressBar.style.width = `${progress}%`;
    elements.progress.setAttribute("aria-valuenow", String(progress));
  }

  function checkAnswer(event) {
    event.preventDefault();

    if (answered) return;

    const selected = elements.form.querySelector(
      'input[name="answer"]:checked'
    );

    if (!selected) {
      elements.feedback.textContent =
        "Choose an answer before checking your response.";
      elements.feedback.hidden = false;
      elements.feedback.classList.remove(
        "answer-feedback--correct",
        "answer-feedback--incorrect"
      );
      return;
    }

    answered = true;

    const question = sessionQuestions[currentIndex];
    const selectedIndex = Number(selected.value);
    const isCorrect = selectedIndex === question.answer;

    if (isCorrect) score += 1;

    const labels = elements.options.querySelectorAll(".answer-option");

    labels.forEach((label, index) => {
      const input = label.querySelector("input");

      input.disabled = true;

      if (index === question.answer) {
        label.classList.add("is-correct");
      } else if (index === selectedIndex) {
        label.classList.add("is-incorrect");
      }
    });

    elements.feedback.textContent =
      `${isCorrect ? "Correct!" : "Not quite."} ` +
      `The correct answer is: ${question.options[question.answer]}. ` +
      question.explanation;

    elements.feedback.hidden = false;
    elements.feedback.classList.toggle(
      "answer-feedback--correct",
      isCorrect
    );
    elements.feedback.classList.toggle(
      "answer-feedback--incorrect",
      !isCorrect
    );

    elements.submitButton.hidden = true;
    elements.nextButton.hidden = false;

    const completedProgress = Math.round(
      ((currentIndex + 1) / sessionQuestions.length) * 100
    );

    elements.progressBar.style.width = `${completedProgress}%`;
    elements.progress.setAttribute(
      "aria-valuenow",
      String(completedProgress)
    );

    if (currentIndex === sessionQuestions.length - 1) {
      elements.nextButton.textContent = "View results";
    } else {
      elements.nextButton.textContent = "Next question →";
    }
  }

  function nextQuestion() {
    if (!answered) return;

    if (currentIndex < sessionQuestions.length - 1) {
      currentIndex += 1;
      renderQuestion();
      elements.question.focus?.();
      return;
    }

    showResults();
  }

  function showResults() {
    const total = sessionQuestions.length;
    const percentage = Math.round((score / total) * 100);

    elements.content.hidden = true;
    elements.results.hidden = false;

    elements.resultsSummary.textContent =
      `You scored ${score} out of ${total} (${percentage}%).`;

    if (percentage === 100) {
      elements.resultsMessage.textContent =
        "Excellent work! You answered every question correctly. Try another topic to keep practising.";
    } else if (percentage >= 70) {
      elements.resultsMessage.textContent =
        "Good progress. Review any explanations you found difficult, then practise again to strengthen your understanding.";
    } else {
      elements.resultsMessage.textContent =
        "Keep learning. Revisit the topic explanations and try again. Each attempt is an opportunity to improve.";
    }
  }

  function restartQuiz() {
    elements.results.hidden = true;
    elements.content.hidden = true;
    elements.setup.hidden = false;
    elements.topicSelect.focus();
  }

  function handleTopicCardClick(event) {
    const link = event.target.closest("[data-topic]");

    if (!link) return;

    const topic = link.dataset.topic;

    if (!Object.hasOwn(TOPIC_LABELS, topic)) return;

    elements.topicSelect.value = topic;
    startQuiz();
  }

  elements.startButton.addEventListener("click", startQuiz);
  elements.form.addEventListener("submit", checkAnswer);
  elements.nextButton.addEventListener("click", nextQuestion);
  elements.restartButton.addEventListener("click", restartQuiz);

  document.querySelectorAll("[data-topic]").forEach((link) => {
    link.addEventListener("click", handleTopicCardClick);
  });
}
