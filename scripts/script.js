const quizData = [
    {
        question: "Was ist Toni's Lieblingszahl?",
        a: "21",
        b: "77",
        c: "3",
        d: "22",
        correct: "d",
    },
    {
        question: "Test",
        a: "a",
        b: "b",
        c: "c",
        d: "d",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
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
            score++;
            submitBtn.classList.remove('red');
            submitBtn.classList.add('green');
        } else {
            submitBtn.classList.add('red');
            submitBtn.classList.remove('green');
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            // After quiz is over, display result
            quiz.style.display = "none"; // Hide quiz content
            resultMessage.style.display = "block"; // Show result message
            if (score === quizData.length) {
                resultMessage.innerHTML = `
                    <h2>Du kannst es fühlen, aber nicht behalten</h2>
                    <button onclick="startQuiz()">Reload</button>
                `;
            } else {
                resultMessage.innerHTML = `
                    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                    <button onclick="startQuiz()">Reload</button>
                `;
            }
        }
    }
});

// Initialize the quiz
startQuiz();
