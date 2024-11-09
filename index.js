const questions = [
    {
        question: "In a class of 200 100level students, 90 study MTH101 140 study PHY101. find the number of students that study only PHY101?",
        answers: [
            { text: "30", correct: false},
            { text: "110", correct: true},
            { text: "60", correct: false},
            { text: "140", correct: false},
        ]
    },
    
    {
        question: "What is the designation for an element with its principal quantum number equals to 3 and its Sommerfeld quanttum number equals to 0",
        answers: [
            { text: "3s", correct: true},
            { text: "2p", correct: false},
            { text: "3p", correct: false},
            { text: "2s", correct: false},
        ]
    },

    {
        question: "Electrons were named by who in what year",
        answers: [
            { text: "J.J Thomson in 1897", correct: false},
            { text: "R.A Milikan in 1909", correct: false},
            { text: "G.J Stoney in 1897", correct: true},
            { text: "A.B Busyarh in 2024", correct: false},
        ]
    },

    {
        question: "Which of these statements is correct",
        answers: [
            { text: "Pressure is a vector quantity", correct: false},
            { text: "Gravitational field is a scaler quantity", correct: false},
            { text: "The unit for density gradient is Kg/cm^4", correct: true},
            { text: "Solid angle has a unit of radian", correct: false},
        ]
    }
];

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Neext";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length + '!';
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = 'block'
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}


nextButton.addEventListener('click', ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})
startQuiz();


