const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Tool Management Language"
        ],
        answer: 0 // Correct option index
    },
    {
        question: "Which tag is used to define a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<nav>"],
        answer: 0
    },
    {
        question: "What is the purpose of the <head> tag in HTML?",
        options: [
            "To display content on the page",
            "To contain metadata and links to resources",
            "To structure the body content",
            "To define a footer for the page"
        ],
        answer: 1
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        options: ["<h6>", "<h1>", "<heading>", "<head>"],
        answer: 1
    },
    {
        question: "Choose the correct HTML element to define important text:",
        options: ["<important>", "<i>", "<strong>", "<b>"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const summaryContainer = document.getElementById("summary-container");
const quizContainer = document.getElementById("quiz-container");
const scoreText = document.getElementById("score-text");
const feedbackList = document.getElementById("feedback-list");
const restartBtn = document.getElementById("restart-btn");

// Load a question dynamically
function loadQuestion(index) {
    const question = quizQuestions[index];
    questionText.textContent = `${index + 1}. ${question.question}`;
    optionsContainer.innerHTML = "";

    // Load options as buttons
    question.options.forEach((option, i) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn", "btn-light");
        button.onclick = () => selectAnswer(index, i);

        // Highlight previously selected answer
        if (userAnswers[index] === i) {
            button.classList.add("btn-primary");
        }
        optionsContainer.appendChild(button);
    });

    // Update progress and button states
    updateProgress(index);
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === quizQuestions.length - 1 ? "Submit" : "Next";
}

// Update the progress bar
function updateProgress(index) {
    const progress = ((index + 0) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.round(progress)}%`;
}

// Handle answer selection
function selectAnswer(questionIndex, optionIndex) {
    userAnswers[questionIndex] = optionIndex;

    // Highlight selected option
    const buttons = optionsContainer.querySelectorAll("button");
    buttons.forEach((button, i) => {
        button.classList.remove("btn-primary");
        button.classList.add("btn-light");
    });

    buttons[optionIndex].classList.add("btn-primary");
}

// Handle navigation to the next question or summary
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        showSummary();
    }
});

// Handle navigation to the previous question
prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

// Display the quiz summary
function showSummary() {
    let score = 0;
    feedbackList.innerHTML = "";

    quizQuestions.forEach((question, i) => {
        const isCorrect = userAnswers[i] === question.answer;
        score += isCorrect ? 1 : -1;

        const feedback = document.createElement("p");
        feedback.textContent = `Q${i + 1}: ${question.question} - ${isCorrect ? "Correct ✅" : "Incorrect ❌"}`;
        feedback.classList.add(isCorrect ? "text-success" : "text-danger");
        feedbackList.appendChild(feedback);
    });

    scoreText.textContent = `You scored ${score} out of ${quizQuestions.length}`;
    quizContainer.classList.add("d-none");
    summaryContainer.classList.remove("d-none");
}

// Restart the quiz
restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    userAnswers = [];
    summaryContainer.classList.add("d-none");
    quizContainer.classList.remove("d-none");
    loadQuestion(0);
});

// Initialize the quiz
loadQuestion(currentQuestionIndex);
