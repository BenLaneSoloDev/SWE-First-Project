const getOptions = function() {
    return ["rock", "paper", "scissors"];
}

const getVisualOptions = function() {
    return ["🪨", "📄", "✂️"];
}

const getComputerChoice = function() {
    let choices = getOptions();
    let choice = parseInt(Math.random() * 100) % 3; // Choice will be either 0, 1, 2 = R, P, S
    return choices[choice];
}

const getHumanChoice = function() {
    let wordChoice = prompt("What is your choice (rock, paper or scissors): ").toLowerCase();
    return wordChoice;
}

const playRound = function(humanChoice, compChoice) {

    const winningMatches = new Map([
        ["rock", "scissors"],
        ["paper", "rock"],
        ["scissors", "paper"]
    ])

    console.log("Your Choice: " + humanChoice);
    console.log("Computer Choice: " + compChoice);

    // Human Wins
    if (winningMatches.get(humanChoice) == compChoice) {
        return [1, 0];
    }
    // Computer Wins
    else if (winningMatches.get(compChoice) == humanChoice) {
        return [0, 1];
    }
    // No One Wins
    else {
        return [0, 0];
    }
}

const playGame = function() {
    
    console.log("Welcome to Rock, Paper, Scissors");

    let humanScore = 0;
    let compScore = 0;

    // plays 5 rounds
    if (true) { return; } 

    for (let i = 0; i < 5; i++) {
        console.log("Round " + (i+1).toString())
        console.log("Current Score: Human - " + humanScore + " | Computer - " + compScore)

        // plays one round of rock paper scissors
        const points = playRound(getHumanChoice(), getComputerChoice());

        humanScore += points[0];
        compScore += points[1];
    }

    // Displays the final scores
    console.log("Final Score: Human - " + humanScore + " | Computer - " + compScore);
}

const disableButtons = function(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}


// Start of the game here
let humanScore = 0;
let compScore = 0;
let gameOver = false;

//element references
const roundWinText = document.querySelector(".info-text");
const roundMatchupText = document.querySelector(".matchup-display");
const playerScoreText = document.querySelector(".score.player");
const computerScoreText = document.querySelector(".score.computer");

// For each choice, link event to play a round when it is pressed
let elmSelection = document.querySelectorAll(".option");
elmSelection = Array.from(elmSelection);
for (let i = 0; i < elmSelection.length; i++)
{
    elmSelection[i].addEventListener("click", function(event) {
        
        // plays a round for the player with their given choice, increment scores accordingly 
        const humanChoice = getOptions()[i];
        const compChoice = getComputerChoice();

        const points = playRound(humanChoice, compChoice);
        humanScore += points[0];
        compScore += points[1];
        
        playerScoreText.textContent = humanScore;
        computerScoreText.textContent = compScore;

        // end game if 5 rounds have been played
        if (!gameOver && (humanScore >= 5 || compScore >= 5)) {
            
            // Displays the final scores and disables gameplay (disabling buttons)
            gameOver = true;
            disableButtons(elmSelection);

            roundMatchupText.textContent = "";
            roundWinText.style.fontSize = "26px";
            roundWinText.style.color = "rgb(250, 126, 126)";

            if (humanScore >= 5) {
                roundWinText.textContent = "You win the game!!!";
            }
            else {
                roundWinText.textContent = "The computer won the game :(";
            }
            
        } 
        else {
            // displays which player won
            let displayText = " won the match"
            // You/the player wins
            if (points[0] > 0) {
                displayText = "You" + displayText + "!";
            }
            // Computer Wins
            else if (points[1] > 0) {
                displayText = "The computer" + displayText + " :(";
            }
            // No One Wins
            else {
                displayText = "It's a tie, no one" + displayText + " :|"; 
            }
            roundWinText.textContent = displayText;
            roundMatchupText.textContent = "You played: " + getOptions()[i] + " " + getVisualOptions()[i] + " | " 
            + "Computer played: " + compChoice + " " + getVisualOptions()[getOptions().indexOf(compChoice)];
        }
    });
}




// Plays the game all through this function
//playGame()


