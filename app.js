
const quotes = ["life is what happens when youre busy making other plans",
    "to live is the rarest thing in the world most people exist that is all",
    "the only limit to our realization of tomorrow will be our doubts of today",
    "the greatest glory in living lies not in never falling but in rising every time we fall",
    "the only person you are destined to become is the person you decide to be",
    "success is not final failure is not fatal it is the courage to continue that counts",
    "the purpose of our lives is to be happy",
    "the only way to do great work is to love what you do",
    "in the end we will remember not the words of our enemies but the silence of our friends",
    "it is not our abilities that show what we truly are it is our choices",
    "life is 10 what happens to us and 90 how we react to it",
    "if you want to live a happy life tie it to a goal not to people or things",
    "success is stumbling from failure to failure with no loss of enthusiasm",
    "if you are not willing to risk the usual you will have to settle for the ordinary",
    "the only place where success comes before work is in the dictionary",
    "the best revenge is massive success",
    "the difference between a successful person and others is not a lack of strength not a lack of knowledge but rather a lack in will",
    "what seems to us as bitter trials are often blessings in disguise",
    "the only way to do great work is to love what you do",
    "success is not final failure is not fatal it is the courage to continue that counts",
    "the only limit to our realization of tomorrow will be our doubts of today",
    "the only person you are destined to become is the person you decide to be",
    "the greatest glory in living lies not in never falling but in rising every time we fall",
    "to live is the rarest thing in the world most people exist that is all",
    "it is not our abilities that show what we truly are it is our choices",
    "life is what happens when youre busy making other plans",
    "the purpose of our lives is to be happy",
    "if you want to live a happy life tie it to a goal not to people or things",
    "success is stumbling from failure to failure with no loss of enthusiasm",
    "if you are not willing to risk the usual you will have to settle for the ordinary",
    "the only place where success comes before work is in the dictionary",
    "the best revenge is massive success",
    "the difference between a successful person and others is not a lack of strength not a lack of knowledge but rather a lack in will",
    "what seems to us as bitter trials are often blessings in disguise",
    "the only way to do great work is to love what you do",
    "success is not final failure is not fatal it is the courage to continue that counts",
    "the only limit to our realization of tomorrow will be our doubts of today",
    "the only person you are destined to become is the person you decide to be",
    "the greatest glory in living lies not in never falling but in rising every time we fall",
    "to live is the rarest thing in the world most people exist that is all",
    "it is not our abilities that show what we truly are it is our choices",
    "life is what happens when youre busy making other plans",
    "the purpose of our lives is to be happy",
    "if you want to live a happy life tie it to a goal not to people or things",
    "success is stumbling from failure to failure with no loss of enthusiasm",
    "if you are not willing to risk the usual you will have to settle for the ordinary",
    "the only place where success comes before work is in the dictionary",
    "the best revenge is massive success",
    "the difference between a successful person and others is not a lack of strength not a lack of knowledge but rather a lack in will",
    "what seems to us as bitter trials are often blessings in disguise"
];

let originalText = "";
let isTypingFinished = false;
let startTime;

function generateRandomQuote() {
    const userInput = document.getElementById("userInput");
    userInput.value = "";
    const randomIndex = Math.floor(Math.random() * quotes.length);
    originalText = quotes[randomIndex];

    const quoteElement = document.getElementById("quote");
    quoteElement.innerHTML = "";

    originalText.split(' ').forEach((word, wordIndex) => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';

        word.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerHTML = char;
            wordDiv.appendChild(span);
        });

        if (wordIndex === 0) {
            wordDiv.classList.add('active');
        }

        quoteElement.appendChild(wordDiv);
    });

    isTypingFinished = false;
    startTime = new Date().getTime();
    updateColors();

    // Clear result element on tab press
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "";
}

function checkKeyPress(event) {
    if (event.key === "Tab") {
        generateRandomQuote();
        // Reset the timer
        startTime = new Date().getTime();
        event.preventDefault();
    } else if (event.key === "Backspace") {
        updateColors();
    } else if (event.key === " " && !isTypingFinished) {
        moveNextWord();
    } else if (event.key === "Enter") {
        displayResults();
    }
}
function moveNextWord() {
    const userInput = document.getElementById("userInput").value;
    const currentWordIndex = userInput.split(' ').length - 1;

    const quoteElement = document.getElementById("quote");
    const words = quoteElement.querySelectorAll('.word');

    if (currentWordIndex < words.length - 1) {
        words[currentWordIndex].classList.remove('active');
        words[currentWordIndex + 1].classList.add('active');
    }

    updateColors();
}

function updateColors() {
    if (isTypingFinished) return;

    const userInput = document.getElementById("userInput").value;
    const quoteElement = document.getElementById("quote");
    const words = quoteElement.querySelectorAll('.word');

    let isIncorrectTyped = false;

    words.forEach((word, i) => {
        const userWord = userInput.split(' ')[i];
        const originalWord = originalText.split(' ')[i];
        const letters = word.querySelectorAll('span');

        let isWordIncorrect = false;

        letters.forEach((span, j) => {
            const userChar = userWord ? userWord[j] : '';
            if (!userChar) {
                span.className = '';
            } else if (userChar === span.innerText) {
                span.className = 'correct';
            } else {
                span.className = 'incorrect';
                isWordIncorrect = true;
                isIncorrectTyped = true;
            }
        });

        if ((userWord && isWordIncorrect) || (userWord && userWord.length !== originalWord.length)) {
            word.classList.add('error');
        } else {
            word.classList.remove('error');
        }
    });

    if (userInput.length === originalText.length) {
        isTypingFinished = true;
        displayResults();
    }
}

function displayResults() {
    const endTime = new Date().getTime();
    const timeElapsedInSeconds = (endTime - startTime) / 1000;

    const totalCorrectWords = calculateCorrectWords();
    const totalIncorrectWords = originalText.split(' ').length - totalCorrectWords;
    const totalWords = originalText.split(' ').length;

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `Total Time Taken (seconds): ${timeElapsedInSeconds.toFixed(2)}<br>
                                        Total Correct Words: ${totalCorrectWords}<br>
                                        Total Incorrect Words: ${totalIncorrectWords}<br>
                                        Total Words in the Quote: ${totalWords}
                                        Press "TAB" for the new Quote`;
}

function calculateCorrectWords() {
    const userInput = document.getElementById("userInput").value;
    const userWords = userInput.split(' ');
    const originalWords = originalText.split(' ');

    let correctWordCount = 0;

    for (let i = 0; i < Math.min(userWords.length, originalWords.length); i++) {
        if (userWords[i] === originalWords[i]) {
            correctWordCount++;
        }
    }



    return correctWordCount;
}

window.onload = generateRandomQuote;