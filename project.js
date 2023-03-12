// STEPS:
// 1. Deposit some money
// 2. Determine the number of lines to bet on
// 3. Collect the bet amount
// 4. Spin the slot amount
// 5. Check if the user won
// 6. Give the user the winnings
// 7. Play again

// Const = constant

//  DEPOSIT INPUT START 
const prompt = require("prompt-sync")();

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        // OR = || 
        if (isNaN(numberDepositAmount) || numberDepositAmount <=0) {
            console.log("Invalid deposit amount, try again. ");
        } else {
            return numberDepositAmount;
        }
    }
};

// In english, it means, if the statement of numberDepositAmount is NaN and is less than 0
// It will return the prompt over and over again, unless it does not meet that criteria anymore
// Therefore, the else is the 

// DEPOSIT INPUT END

// NUMBER OF LINES START 

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
        // OR = || 
        if (isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again. ");
        } else {
            return numberOfLines;
        }
    }
};

// NUMBER OF LINES END

// Collect bet amount start
const getBet = (balance, lines) => {
    // We can use the balance inside this function 
    while (true) {
        const bet = prompt("Enter the total bet: ");
        const numberBet = parseFloat(bet);
        // OR = || 
        if (isNaN(numberBet) || numberBet <=0 || numberBet > balance / lines ) {
            console.log("Invalid bet, try again. ");
        } else {
            return numberBet * lines;
        }
    }
};
// Collect bet amount end



let balance = deposit();

// A variable using let, can be altered (added or substracted)
const numberOfLines = getNumberOfLines();
const bet = getBet(balance);
console.log(bet);
//  It will print out the deposit amount, console log is a print function
//  It outputs a message to the web console/terminal