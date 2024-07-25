// script.js

const quizData = [
    {
      question: "What is your biggest concern regarding healthcare?",
      options: [
        "High cost of GP visits",
        "Expensive medication",
        "Lack of access to eye tests and flu vaccines",
        "Uncertainty about medical transportation in emergencies",
        "Needing 24/7 medical advice and trauma counseling",
      ],
      feedback: [
        "MyDoctor Membership offers affordable GP visits, making healthcare more accessible and cost-effective for you.",
        "With MyDoctor, over-the-counter medication is included in your membership, reducing your expenses.",
        "Eye tests and flu vaccines are part of the MyDoctor benefits, ensuring you get the preventive care you need.",
        "MyDoctor provides medical transportation services, giving you peace of mind in emergencies.",
        "MyDoctor Membership includes 24/7 medical advice and trauma counseling, supporting you whenever you need it.",
      ],
    },
    {
      question: "How often do you visit a GP in a year?",
      options: [
        "Rarely (0-2 times)",
        "Occasionally (3-5 times)",
        "Frequently (6-10 times)",
        "Very frequently (11+ times)",
      ],
      feedback: [
        "Even with occasional visits, MyDoctor Membership saves you money with each GP visit included.",
        "Even with occasional visits, MyDoctor Membership saves you money with each GP visit included.",
        "With frequent visits, MyDoctor Membership provides substantial savings on your healthcare costs.",
        "With frequent visits, MyDoctor Membership provides substantial savings on your healthcare costs.",
      ],
    },
    {
      question:
        "Do you find it challenging to afford over-the-counter medication?",
      options: ["Yes", "No", "Sometimes"],
      feedback: [
        "MyDoctor Membership covers over-the-counter medication, easing the financial burden.",
        "Even if you don't currently struggle, having MyDoctor ensures you are covered in the future.",
        "MyDoctor Membership covers over-the-counter medication, easing the financial burden.",
      ],
    },
    {
      question: "Do you need access to eye tests and flu vaccines?",
      options: [
        "Yes, regularly",
        "Occasionally",
        "No, but I might in the future",
      ],
      feedback: [
        "Access to eye tests and flu vaccines is included in MyDoctor Membership.",
        "Access to eye tests and flu vaccines is included in MyDoctor Membership.",
        "Having MyDoctor Membership ensures you're covered whenever you need these services.",
      ],
    },
    {
      question:
        "How important is it to have 24/7 access to medical advice and trauma counseling?",
      options: ["Very important", "Somewhat important", "Not important"],
      feedback: [
        "MyDoctor Membership offers round-the-clock medical advice and trauma counseling, providing continuous support.",
        "Having occasional access is beneficial, and MyDoctor Membership offers this convenience.",
        "Even if not important now, having access to these services ensures you are prepared for any future needs.",
      ],
    },
    {
      question: "How much are you currently spending on healthcare per month?",
      options: [
        "Less than R500",
        "R500 - R1,000",
        "R1,000 - R2,000",
        "More than R2,000",
      ],
      feedback: [
        "MyDoctor Membership can potentially lower your monthly healthcare expenses.",
        "MyDoctor Membership can potentially lower your monthly healthcare expenses.",
        "By switching to MyDoctor, you can save significantly on your monthly healthcare costs.",
        "By switching to MyDoctor, you can save significantly on your monthly healthcare costs.",
      ],
    },
  ];
  
  const quizContainer = document.getElementById("quiz");
  const finalScreen = document.getElementById("final-screen");
  const ctaButton = document.getElementById("cta-button");
  const contactForm = document.getElementById("contact-form");
  const feedbackCard = document.getElementById("feedback-card");
  const feedbackText = document.getElementById("feedback-text");
  const nextButton = document.getElementById("next-button");
  
  let currentQuestionIndex = 0;
  let userResponses = [];
  
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
          ${
            currentQuestionIndex === 0
              ? "<p>Struggling with healthcare costs? Take our quick quiz to see how MyDoctor can help you.</p>"
              : ""
          }
          <h2>${currentQuestion.question}</h2>
          <ul>
              ${currentQuestion.options
                .map(
                  (option, index) => `
                  <li>
                      <input type="radio" id="option${index}" name="question${currentQuestionIndex}" value="${index}">
                      <label for="option${index}">${option}</label>
                  </li>
              `
                )
                .join("")}
          </ul>
          <button onclick="submitAnswer()">Next</button>
      `;
  }
  
  function submitAnswer() {
    const selectedOption = document.querySelector(
      `input[name="question${currentQuestionIndex}"]:checked`
    );
    if (selectedOption) {
      const feedback =
        quizData[currentQuestionIndex].feedback[selectedOption.value];
      feedbackText.textContent = feedback;
      feedbackCard.classList.remove("hidden");
      userResponses.push({
        question: quizData[currentQuestionIndex].question,
        answer: quizData[currentQuestionIndex].options[selectedOption.value],
        feedback: feedback,
      });
    } else {
      alert("Please select an option.");
    }
  }
  
  function closeModal() {
    feedbackCard.classList.add("hidden");
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showFinalScreen();
    }
  }
  
  nextButton.addEventListener("click", closeModal);
  
  function showFinalScreen() {
    quizContainer.classList.add("hidden");
    finalScreen.classList.remove("hidden");
  }
  
  ctaButton.addEventListener("click", () => {
    contactForm.classList.remove("hidden");
  });
  
  document.getElementById("contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = "Quiz Results";
    const html = userResponses.map(response => `
      <p><strong>Question:</strong> ${response.question}</p>
      <p><strong>Answer:</strong> ${response.answer}</p>
      <p><strong>Feedback:</strong> ${response.feedback}</p>
    `).join("<br>");
  
    fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: email, subject, html }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Error sending email.");
      });
  });
  
  loadQuestion();
  