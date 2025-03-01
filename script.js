let startTime, endTime;
let score = 0;
let currentQuestion = 0;
let questions = [
    { question: "What does HTML stand for?", options: ["Hypertext Markup Language", "Hyperlink Text", "High Text Markup", "None"], answer: 0 },
    { question: "What is the output of `2 + '2'` in JavaScript?", options: ["4", "22", "Error", "None"], answer: 1 }
];

function startQuiz() {
    startTime = new Date();  // Start time tracking
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }
    
    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;
    document.querySelectorAll(".option").forEach((btn, i) => {
        btn.innerText = q.options[i];
    });
}

function selectAnswer(index) {
    if (index === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function endQuiz() {
    endTime = new Date();
    let timeTaken = Math.floor((endTime - startTime) / 1000);  // Convert to seconds
    
    alert(`Quiz over! Score: ${score}, Time Taken: ${timeTaken} seconds`);
}

function submitScore() {
    let username = document.getElementById("username").value;
    if (!username) {
        alert("Enter your name!");
        return;
    }

    let timeTaken = Math.floor((endTime - startTime) / 1000); // Convert to seconds

    fetch("http://localhost:5000/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, score, time_taken: timeTaken })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error("Error:", error));
}

window.onload = startQuiz;
