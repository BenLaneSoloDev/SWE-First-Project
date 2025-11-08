const getOptions = function() {
    return ["rock", "paper", "scissors"];
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

// Plays the game all through this function
playGame()


