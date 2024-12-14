const quizData = [
    {
        question: "Durch welche Serie wurde der Ausspruch \"Winter is coming\" (Der Winter naht) berühmt?",
        a: "House of cards",
        b: "Herr der Ringe",
        c: "Game of Thrones",
        d: "House of Dragons",
        correct: "c",
    },
    {
        question: "Welche Farbe hat ein Schneekristall?",
        a: "weiß",
        b: "durchsichtig",
        c: "hellblau",
        d: "grau",
        correct: "b",
    },
    {
        question: "\"Snö\" sagt man in welchem Land zu Schnee?\n",
        a: "Schweden",
        b: "Finnland",
        c: "Norwegen",
        d: "Dänemark",
        correct: "a",
    },
    {
        question: "In welchen Ländern fällt der meiste Schnee?",
        a: "Japan und Kanada",
        b: "Finnland und Grönland",
        c: "Finnland und Kanada",
        d: "Georginen und Schweden",
        correct: "a",
    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const resultMessage = document.getElementById('resultMessage'); // Added element for result message

let currentQuiz = 0;
let score = 0;

// Function to initialize and start the quiz
function startQuiz() {
    score = 0;
    currentQuiz = 0;
    resultMessage.style.display = "none"; // Hide result message at the start
    quiz.style.display = "block"; // Show the quiz content
    console.log(submitBtn);  // Check if this is pointing to the right button
    loadQuiz();
}

// Function to load quiz content
function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    submitBtn.classList.remove('red', 'green'); // Remove any color before submitting the next question
}

// Function to deselect answers
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// Function to get selected answer
function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

// Submit button click handler
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;  // Increase the score if the answer is correct
        }

        currentQuiz++; // Move to the next question

        // After answering, either move to the next question or show the result
        if (currentQuiz < quizData.length) {
            loadQuiz(); // Load the next quiz question
        } else {
            quiz.style.display = "none"; // Hide quiz content
            resultMessage.style.display = "block"; // Show result message

            // Check if the user answered all questions correctly
            if (score === quizData.length) {
                resultMessage.innerHTML = `
                    <h2>MMXV</h2>
                    <button onclick="startQuiz()">Neu laden</button>
                `;
            } else {
                resultMessage.innerHTML = `
                    <h2>Du hast ${score}/${quizData.length} Fragen richtig beantwortet</h2>
                    <button onclick="startQuiz()">Neu laden</button>
                `;
            }
        }
    }
});

// Initialize the quiz
startQuiz();
