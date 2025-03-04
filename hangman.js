//Global Variables:

const wordBank = ["outer", "right", "might", "dance", "oaths", "brick", "prick", "bulky", "lover", "chunk", "raise", "units", "flush", "crash", "crush", "waltz", "quick", "lives", "opens", "joins", "makes", "water", "width", "nails", "stone", "toner", "moist", "suite", "squad", "chalk", "hotel", "scary", "sport", "squad", "flash", "grand", "grant", "fluid", "flunk", "great", "until", "given", "loner", "taken", "often", "hangs", "chair", "think", "ulcer", "cloud"];
let choosenWord;
let lettersGuessed;
var health = 5;
var score = 0;

//Function to initiate game

function setupGame(){
	indexGenerator();
	updateHangmanGraphics();
}

//Function to generate random index to get random word

function indexGenerator(){
	let randomNumber = Math.trunc(Math.random() * wordBank.length);
	choosenWord = wordBank[randomNumber];
}

//Function to check letter input

function checkInputs(){
    if (score == 5 || health == 0) {
        return;
    }
    validatePrompt();
    checkLetter();
}
    
//Function to update hangman drawing based on health:

function updateHangmanGraphics() {
    if (health === 4) {
        document.getElementById('head').style.display = 'block';
        document.getElementById('torso').style.display = 'block';
    } else if (health === 3) {
        document.getElementById('arm-1').style.display = 'block';
    } else if (health === 2) {
        document.getElementById('arm-2').style.display = 'block';
    } else if (health === 1) {
        document.getElementById('foot-1').style.display = 'block';
    } else if (health === 0) {
        document.getElementById('foot-2').style.display = 'block';
    }
}

function updateDisplay(){
    if(score === 5){
        alert('CONGRATULATIONS! 🎉 YOU WON THE GAME!');
        alert('If you want to play again, the page will automatically reload in 15 seconds or you can reload the page on your own.')
        document.getElementById("lives").innerHTML = health;
        setTimeout(function() {
            window.location.reload();
        }, 15000);
        return;
    } else if (health <= 0){
        alert(`Game over! The word was: ${choosenWord}.`);
        alert('If you want to play again, the page will automatically reload in 15 seconds or you can reload the page on your own.')
        document.getElementById("lives").innerHTML = health;
        setTimeout(function() {
            window.location.reload();
        }, 15000);
        return;
    }else{
        document.getElementById("lives").innerHTML = health;
    }
    updateHangmanGraphics();
}

//Function to handle letter guess:
function checkLetter(){

    let guessedByUser = (prompt('Enter a Letter in lowercase: '));

    if(document.getElementById('s-0').innerHTML === guessedByUser ||
        document.getElementById('s-1').innerHTML === guessedByUser ||
        document.getElementById('s-2').innerHTML === guessedByUser ||
        document.getElementById('s-3').innerHTML === guessedByUser ||
        document.getElementById('s-4').innerHTML === guessedByUser) {
        alert("You already guessed that letter! Try a different one.");
        health--;
        updateDisplay();
        return;
    }

    if (!guessedByUser || guessedByUser.length !==1){
        alert('Invalid input. Please enter a single letter only.');
        updateDisplay();
        return;
    } else if (guessedByUser === null || guessedByUser === " "){
        alert('No input! Please enter a single letter.');
        updateDisplay();
        return;
    } else if(!choosenWord.includes(guessedByUser)){
        alert('The letter you guessed is not included in the word.');
        health--;
        updateHangmanGraphics();
        updateDisplay();
        return;

    }else if (choosenWord.includes(guessedByUser)){
        if(guessedByUser === choosenWord[0]){
            document.getElementById('s-0').innerHTML = guessedByUser;
            score++;
            updateDisplay();
        }else if(guessedByUser === choosenWord[1]){
            document.getElementById('s-1').innerHTML = guessedByUser;
            score++;
            updateDisplay();
        }else if(guessedByUser === choosenWord[2]){
            document.getElementById('s-2').innerHTML = guessedByUser;
            score++;
            updateDisplay();
        }else if(guessedByUser === choosenWord[3]){
            document.getElementById('s-3').innerHTML = guessedByUser;
            score++;
            updateDisplay();
        }else if(guessedByUser === choosenWord[4]){
            document.getElementById('s-4').innerHTML = guessedByUser;
            score++;
            updateDisplay();
        }
    }else{
        alert('Your input is invalid. Try Again!')
        health--;
        updateDisplay();
    }

}

// Heart confetti effect
function triggerHeartConfetti() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 50,
            spread: 70,
            colors: ['#ff69b4', '#ff0000', '#ffc0cb'],
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// Initial game setup call
setupGame();

