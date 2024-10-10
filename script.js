const quizQuestions = [
    {
      question: "Which is the largest animal in the world?",
      answers: [
        { text: "Shark", isCorrect: false },
        { text: "Blue Whale", isCorrect: true },
        { text: "Elephant", isCorrect: false },
        { text: "Giraffe", isCorrect: false },
      ],
    },
    {
      question: "Which of the following is a client-side language?",
      answers: [
        { text: "Java", isCorrect: false },
        { text: "JavaScript", isCorrect: true },
        { text: "Python", isCorrect: false },
        { text: "C++", isCorrect: false },
      ],
    },
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hypertext Markup Language", isCorrect: true },
        { text: "Cascading Style Sheet", isCorrect: false },
        { text: "JSON", isCorrect: false },
        { text: "Helicopters Terminals Motorboats Lamborginis", isCorrect: false },
      ],
    },
  ];
  
  const questionContainer = document.querySelector(".que_box");
  const nextButton = document.querySelector(".btn button");
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Start the quiz with the first question
  loadQuestion(currentQuestionIndex);
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      loadQuestion(++currentQuestionIndex);
    } else {
      displayScore();
    }
  });
  
  function loadQuestion(index) {
    const currentQuestion = quizQuestions[index];
    questionContainer.innerHTML = `
          <span>${index + 1}. ${currentQuestion.question}</span>
          <div class="option">${currentQuestion.answers[0].text}</div>
          <div class="option">${currentQuestion.answers[1].text}</div>
          <div class="option">${currentQuestion.answers[2].text}</div>
          <div class="option">${currentQuestion.answers[3].text}</div>
      `;
    
    const answerOptions = document.querySelectorAll(".option");
    
    answerOptions.forEach((option, idx) => {
      nextButton.style.display = "none";
      option.addEventListener("click", () => {
        if (currentQuestion.answers[idx].isCorrect) {
          option.style.backgroundColor = "green";
          score++;
        } else {
          option.style.backgroundColor = "red"; 
          answerOptions.forEach((opt, i) => {
            if (currentQuestion.answers[i].isCorrect) {
              opt.style.backgroundColor = "green"; 
            }
          });
        }
        nextButton.style.display = "block";
      });
    });
  }
  
  function displayScore() {
    questionContainer.innerHTML = `
     <p>Your score: ${score} out of ${quizQuestions.length}</p>`;
  
    nextButton.style.display = "none";
  
    let replayButton = document.createElement("button");
    replayButton.innerHTML = "Play again";
    replayButton.classList.add("playbutton");
    replayButton.style.display = "block"; 
    replayButton.style.margin = "20px auto"; 
  
    replayButton.addEventListener("click", () => {
      currentQuestionIndex = 0; 
      score = 0; 
      loadQuestion(currentQuestionIndex); 
      nextButton.style.display = "none";
      replayButton.remove(); 
    });
  
    questionContainer.appendChild(replayButton); 
  }