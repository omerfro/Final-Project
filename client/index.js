/*

    1. Pick a random word from the list and store it in a word variable

    2. Init an empty array userInput to store the user input

    3. Init a number variable currentLine and init it with 1

    Until the user guesses the word or untill the user failed 6 times do:
        
        4. Wait untill the user enter 5 chars and store them in the userInput
        
        5. Check it the userInput is a word in the list
            - If yes, make the current line inputs disabled and proceed to the check
            - If no, display an error "not in list"
        
        6. For each userInput char:
            - If the letter is in the word and in the correct position, change color to green
            - If the letter is in the word and in the wrong position, change color to orange
            - If the letter is not in the word, change color to grey
        
        7. If there are still tries left increadse currentLine by one

    8. If the user guessed correctly display a message: 'good job'

    9. If the user failed 6 times, display a messay: 'the correct word is: word and you failed'

*/

// Importing the list of words from another file
import words from './words.js';
import { getNamedNumer, bindCurrentFormElement } from './helpers.js';  

// Getting a random word from the list of words
const randomNumber = Math.floor(Math.random() * 2315);
const word = words[randomNumber];

// Initating the counter that will control the current line the user is playing
let currentLine = 1;

// Create the root ol element
const olElement = document.createElement('ol');
document.body.prepend(olElement);

// Creating the 6 rows
for (let i = 1; i <= 6; i++){
    createNewRow(i);
}

// Binding the form element in the HTML to the verifyWord function so that on every enter key hit this function will be called
bindCurrentFormElement(currentLine, verifyWord);

// Creating a new row and appending it to the root ol element
function createNewRow(lineNumber) {
    
    // Creating the form element
    const formElement = document.createElement('form');
    formElement.tabIndex = 0;
    formElement.ariaLabel = `${getNamedNumer(lineNumber)} word`;
    
    // Creating the 5 input elements
    for (let charIndex = 1; charIndex <= 5; charIndex++){
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.value = '';
        inputElement.maxLength = 1;
        inputElement.ariaLabel = `${getNamedNumer(charIndex)} letter`;
        inputElement.disabled = lineNumber === 1 ? false : true;
        formElement.append(inputElement);
    }
    
    // Creating the input submit element to enable the enter key hack
    const submitElement = document.createElement('input');
    submitElement.type = 'submit';
    formElement.append(submitElement);
    
    // Creating the li element
    const liElement = document.createElement('li');
    liElement.classList.add('word');
    liElement.append(formElement);

    // Appending the li element to the root ol element
    olElement.append(liElement);
}

// Called when the user hits the enter key
function verifyWord(event) {
    
    // Prevent the default action of the form that redirects the page
    event.preventDefault();

    // This is where we store the users input
    let wordToCheck = '';    

    // Getting the user's input from the input elements
    const inputSelector = `ol li:nth-child(${currentLine}) form input[type=text]`;
    document.querySelectorAll(inputSelector).forEach(input => {
        wordToCheck = wordToCheck + input.value.trim();
    })

    // Checking if the user finished guessing the word
    if (wordToCheck.length !== 5) {
        return;
    }

    // Checking if the user guessed the word correctly
    if (wordToCheck === word) {
        return alert('You won the game!');
    }

    // Checking if the user guessed a word that is not in the list
    if (!words.includes(wordToCheck)) {
        return alert('Word not in list');
    }

    // Checking if the user used all theirs tries
    if (currentLine === 6) {
        return alert('You lost the game!');
    }

    // Checking letter by letter and marking the correct and wrong letters
    for (let i = 0; i < 5; i++) {
        const char = wordToCheck[i];
        const currentInput = document.querySelectorAll(inputSelector)[i];
        currentInput.disabled = true;
        
        if (char === word[i]) {
            currentInput.classList.add('yes');
        } else if (word.includes(char)) {
            currentInput.classList.add('misplaced');
        } else {
            currentInput.classList.add('no');
        }
    }

    // Moving the user to the next line
    currentLine++;

    // Enabling the inputs in the new line
    const nextLineInputSelector = `ol li:nth-child(${currentLine}) form input[type=text]`;
    document.querySelectorAll(nextLineInputSelector).forEach(input => {
        input.disabled = false;
    })

    // Binding the new form element to the verifyWord function
    bindCurrentFormElement(currentLine, verifyWord);
}

