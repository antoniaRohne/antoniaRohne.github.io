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
        question: "Was ist Vicky's Lieblingseissorte?",
        a: "Vanille",
        b: "Schoko",
        c: "Erdbeer",
        d: "Haselnuss",
        correct: "c",
    },
    {
        question: "Was war Toni's höchster Overwatch Rank?",
        a: "Silber",
        b: "Gold",
        c: "Platin",
        d: "Diamond",
        correct: "c",
    },
    {
        question: "Wielange arbeitet Vicky schon bei BASF?",
        a: "13 Jahre",
        b: "10 Jahre",
        c: "15 Jahre",
        d: "9 Jahre",
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
        console.log(`Selected answer: ${answer}`);
        if (answer === quizData[currentQuiz].correct) {
            score++;
            document.getElementById("submit").classList.remove('red');  // Remove red class if answer is correct
            document.getElementById("submit").classList.add('green');   // Add green class for correct answer
            console.log("Correct! Green class added.");
        } else {
            document.getElementById("submit").classList.remove('green');     // Add red class for wrong answer
            document.getElementById("submit").classList.add('red'); // Remove green class if answer is wrong
            console.log("Wrong! Red class added.");
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.style.display = "none"; // Hide quiz content
            resultMessage.style.display = "block"; // Show result message
            resultMessage.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <button onclick="startQuiz()">Reload</button>
            `;
        }
    }
});

// Initialize the quiz
startQuiz();
