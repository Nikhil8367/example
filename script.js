document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/questions")
        .then(response => response.json())
        .then(data => {
            let quizContainer = document.getElementById("quiz-container");
            quizContainer.innerHTML = ""; // Clear previous content
            data.forEach((q, index) => {
                let questionHTML = `
                    <div class="question">
                        <p><strong>${index + 1}. ${q.question}</strong></p>
                        <ul>
                            <li>${q.option1}</li>
                            <li>${q.option2}</li>
                            <li>${q.option3}</li>
                            <li>${q.option4}</li>
                        </ul>
                    </div>
                `;
                quizContainer.innerHTML += questionHTML;
            });
        })
        .catch(error => console.error("Error fetching questions:", error));
});
