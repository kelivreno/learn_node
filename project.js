// Const = constant
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
    // The objects, has a key and a value. Ex: Key A has a
    // 2 value
    // No need quotation marks in javascript, only in Python you need it
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

// putting the global variables at the very top, so that
// it is easy to see and refer
// putting and underscore between two caps is conventional

//  DEPOSIT INPUT START 

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
// Therefore, the else will return what was inputed by the user since it fullfills the criteria


// DEPOSIT INPUT END

// NUMBER OF LINES START - Getting the number of lines the user wants to bet on

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

// COLLECT BET AMOUNT START - Getting a valid bet amount per line based on the balance and the number 
// of lines they're betting on
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

// COLLECT BET AMOUNT END

// SPIN THE SLOT MACHINE START - Generates all the symbols, then randomly select them

 const spin = () => {
    // This generate an array that contains the possible symbols that we have
    const symbols = [];
    // Not changing what array is b. 
    // An array is a reference data-type, we can manipulate the inside of the array
    // Without adding it in the original 
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i=0; i < count; i++) {
            symbols.push(symbol);
            // push is a way to insert something into an array
            // Other languages uses append
        }
    }
    
        const reels = [];
        for (let i = 0; i < COLS; i++) {
            // While i is less than COLS, keep looping until
            // It doesn't fulfill it anymore
            reels.push([]);
            const reelSymbols = [...symbols];
            for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                // Math.floor is used to round to the nearest whole number
                    const selectedSymbol = reelSymbols[randomIndex];
                    reels[i].push(selectedSymbol);
                    reelSymbols.splice(randomIndex,1);
                    // 1 means removing 1 element, randomIndex is the position where we're removing the element
                    // flow is => Selecting a random index, adding it, then removing it so that
                    // it doesn't show up again when we continue generating the reel
            }
        }
        return reels;
 };

// SPIN THE SLOT MACHINE END

// TRANSPOSE MATRIX START - Converting all the columns into rows 
const transpose = (reels) => {
    const rows = [];
    for (let i=0; i<ROWS; i++) {
        rows.push([]);
        for (let j=0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows
};

// TRANSPOSE MATRIX END

// STYLED ROWS DISPLAY START - Print rows in a nice and fancy format
const printRows = (rows) => {
    for(const row of rows) {
        let rowString = "";  // Empty string is "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol 
            // Concatinating a string, adding elements to the string
            // Example "A" + "A" = "AA"
            if (i != row.length - 1) {
                // != does not equal, 1 is the maximum index
                rowString += " | "
            }
        }
        console.log(rowString);

    }
};
// STYLED ROWS DISPLAY END

// GET WINNINGS START - Determining the all of the winnings from the specific reels
const getWinnings = (rows, bet, numberOfLines) => {
    // See how many lines they're checking based on the bet
    // If they bet on three we're checking all of the rows
    let winnings = 0;
    for (let row=0; row < numberOfLines; row++) {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if(symbol != symbols[0]) {
                allSame = false;
                // We did not win
                break; // Exit the for loop
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
};
// GET WINNINGS END

// GAME FUNCTION - Continually play the game until the user ends a lot of money or until they
// Don't want to play anymore
const game = () => {
    let balance = deposit();
    // A variable using let, can be altered (added or substracted)
    while (true) {
        console.log("You have a balance of $" + balance);
        const lines = getNumberOfLines();
        const bet = getBet(balance, lines);
        balance -= bet * lines;
        const reels = spin();
        const rows = transpose(reels);
        console.log(reels);
        console.log(rows);
        printRows(rows);
        const winnings = getWinnings(rows, bet, lines);
        balance += winnings;
        // The bet is per line
        console.log("You won, $" + winnings.toString());
        //  It will print out the deposit amount, console log is a print function
        //  It outputs a message to the web console/terminal
        if (balance <=0) {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");
        if (playAgain != "y") break;

    }
};

// GAME FUNCTION END

game();
