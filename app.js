const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    console.log('Started');
    startButton.classList.add('hide');
    shuffledQuestions = question.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    })
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e){
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
    }
    else{
        startButton.innerText = 'Започни на ново!';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }
    else{
        element.classList.add('wrong');
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const question = [
    {
        question: 'Колко е 2 + 2 ?',
        answers: [
            {text: '4', correct: true},
            {text: '8', correct: false},
            {text: '22', correct: false},
            {text: '44', correct: false},
        ]
    },
    {
        question: 'Колко е 2 * 2 ?',
        answers: [
            {text: '4', correct: true},
            {text: '8', correct: false},
            {text: '12', correct: false},
            {text: '20', correct: false},
        ]
    },
    {
        question: 'Коя е морската столица на България ?',
        answers: [
            {text: 'София', correct: false},
            {text: 'Пловдив', correct: false},
            {text: 'Варна', correct: true},
            {text: 'Бургас', correct: false},
        ]
    },
    {
        question: 'На колко години в България се става пълнолетен ?',
        answers: [
            {text: '20', correct: false},
            {text: '18', correct: true},
            {text: '21', correct: false},
            {text: '16', correct: false},
        ]
    }
]