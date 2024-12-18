const quizData = [
    {
        question: "Wie lautet der längste Ortsname Europas?",
        a: "Ahoundollyngroundershirewestllyngoughlands",
        b: "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch",
        c: "Tintraycherfilllosykoromountainken",
        d: "Folkinshiredroundedwestminstercubbytown",
        correct: "b",
    },
    {
        question: "Welche dieser landesspezifischen Regeln ist frei erfunden?",
        a: "In Singapur muss man sich Kaugummis vom Arzt verordnen lassen.",
        b: "In Großbritannien ist es verboten, im Parlament zu sterben.",
        c: "Auf den Philippinen darf in Karaoke-Bars, Frank Sinatras ´My Way` nicht gesungen werden.",
        d: "In Island ist das Küssen in der Blauen Lagune verboten.",
        correct: "d",
    },
    {
        question: "Knapp ein Drittel der Oberfläche Deutschlands ist mit... bedeckt.",
        a: "Städte",
        b: "Straßen",
        c: "Wälder",
        d: "Wasser",
        correct: "c",
    },
    {
        question: "Wo wird mehr Guinness als in Irland konsumiert?",
        a: "Nigeria",
        b: "Deutschland",
        c: "Neuseeland",
        d: "Kanada",
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
                    <h2>404-LOCATION NOT FOUND</h2>
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
