// STEPS:
// 1. Deposit some money
// 2. Determine the number of lines to bet on
// 3. Collect the bet amount
// 4. Spin the slot amount
// 5. Check if the user won
// 6. Give the user the winnings
// 7. Play again

// Const = constant

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

deposit();