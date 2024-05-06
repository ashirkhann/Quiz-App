// Defining questions
const questions = [
    {
        question: 'Which is the largest animal in the world?',
        answers: [
            { text: 'Shark', correct: false },
            { text: 'Whale', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Giraffe', correct: false },
        ]
    },
    {
        question: 'Which is the largest country in the world?',
        answers: [
            { text: 'Canada', correct: false },
            { text: 'USA', correct: false },
            { text: 'China', correct: false },
            { text: 'Russia', correct: true },
        ]
    },
    {
        question: 'Which is the largest mountain in the world?',
        answers: [
            { text: 'K2', correct: false },
            { text: 'Mount Everest', correct: true },
            { text: 'kati pahari', correct: false },
            { text: 'Surjani town k pahar', correct: false },
        ]
    }
];

// DOM elements
const questionNoElement = document.getElementById('questionNo');
const questionElement = document.getElementById('question');
const options = document.getElementById('options');
const submitBtn = document.getElementById('submit');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const countdownTimer = document.getElementById('countdown');
const scoreElement = document.getElementById('score');

// Global Variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let countdownInterval;

// Functions

// Function to start the countdown
const startCountdown = () => {
    let timer = 10;

    countdownInterval = setInterval(() => {
        countdownTimer.textContent = timer;
        timer--;
        if (timer < 0) {
            clearInterval(countdownInterval);
            countdownTimer.textContent = 'Time Up!';
            handleTimeUp();
        }
        progressBar.style.width = `${timer * 10}%`;
    }, 1000);
};

// Function to stop the countdown
const stopCountdown = () => {
    clearInterval(countdownInterval);
};

// Function to handle time up
const handleTimeUp = () => {
    Array.from(options.children).forEach(btn => {
        if (btn.dataset.correct === 'true') {
            btn.classList.add('border-2', 'border-green-500');
        }
    });
    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
};

// Function to display a question
const displayQuestion = () => {
    progressBar.style.width = `100%`;
    startCountdown();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.textContent = currentQuestion.question;
    questionNoElement.textContent = `Question ${questionNo}/${questions.length}`;

    // Clear previous options
    options.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const option = document.createElement('button');
        option.innerHTML = answer.text;
        option.classList.add('btn');
        options.appendChild(option);

        if (answer.correct) {
            option.dataset.correct = answer.correct;
        }

        option.addEventListener('click', (e) => {
            handleOptionClick(e.target);
        });
    });
};

// Function to handle option click
const handleOptionClick = (clickedOption) => {

    if (selectedAnswer === clickedOption) {
        // Deselect the option if it's already selected
        selectedAnswer = null;
        clickedOption.classList.remove('border-2', 'border-blue-500');
        submitBtn.disabled = true;
        submitBtn.classList.add('bg-blue-900');
        submitBtn.classList.remove('bg-blue-600');
    } else {
        // Deselect the previously selected option, if any
        if (selectedAnswer) {
            selectedAnswer.classList.remove('border-2', 'border-blue-500');
        }
        // Select the clicked option
        selectedAnswer = clickedOption;
        selectedAnswer.classList.add('border-2', 'border-blue-500');
        submitBtn.disabled = false;
        submitBtn.classList.remove('bg-blue-900');
        submitBtn.classList.add('bg-blue-600');
    }
};

// Function to handle submit button click
const handleSubmission = () => {
    stopCountdown();
    selectAnswer();
};

// Function to select an answer
const selectAnswer = () => {
    selectedAnswer.classList.remove('border-2', 'border-blue-500');

    if (selectedAnswer.dataset.correct === 'true') {
        selectedAnswer.classList.add('border-2', 'border-green-500');
        score++;
    } else {
        selectedAnswer.classList.add('border-2', 'border-red-500');
    }

    Array.from(options.children).forEach(btn => {
        if (btn.dataset.correct === 'true') {
            btn.classList.add('border-2', 'border-green-500');
        }
        btn.disabled = true;
    });

    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
};

// Function to handle next button click
const handleNextQuestion = () => {
    submitBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    if (currentQuestionIndex < questions.length) {
        currentQuestionIndex++;
        displayNextQuestion();
    } else {
        console.log('Quiz completed');
    }
    submitBtn.disabled = true;
    submitBtn.classList.add('bg-blue-900');
};

// Function to display next question
const displayNextQuestion = () => {
    // stopCountdown();
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        displayScore();
    }
};

// Function to display the final score
const displayScore = () => {
    questionNoElement.textContent = '';
    submitBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    questionElement.innerHTML = '';
    options.innerHTML = '';
    scoreElement.classList.remove('hidden');
    scoreElement.innerHTML = `Quiz Completed <p class="text-xl"> You scored ${score}/${questions.length}</p>`;
};

// Event listeners
submitBtn.addEventListener('click', handleSubmission);
nextBtn.addEventListener('click', handleNextQuestion);

// Initial call to display the first question
displayQuestion();
