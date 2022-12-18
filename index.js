#! /usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { sleep, randomNum, getAString } from "./utils.js";
import { askName, askGameLevel, askNumber, askToContinue } from "./answers.js";
let userName;
async function welcome() {
    const beautifyStr = getAString(60, "*");
    const rainbowTitle = chalkAnimation.rainbow(`\n${beautifyStr}
                    Hello, ${userName.toUpperCase()}!
    You have to guess the random number between 1-100\n${beautifyStr}\n`);
    rainbowTitle.start();
    await sleep();
    rainbowTitle.stop();
}
async function startGame() {
    const maxGuesses = await askGameLevel();
    console.log(`${chalk.hex("#5f27cd")(`You have ${maxGuesses} attempts to guess the number.`)}\n`);
    const generatedNum = randomNum(1, 100);
    let remainingGuesses = maxGuesses;
    const previousGuesses = [];
    let playerWinned = false;
    let hint;
    do {
        try {
            if (hint) {
                const neonTitle = chalkAnimation.neon(`NOTE: ${hint}${"\n"}You have ${remainingGuesses} attempts left. Your previous guesses are: ${previousGuesses.join()}\n`);
                neonTitle.start();
                await sleep();
                neonTitle.stop();
            }
            const enteredNumber = await askNumber();
            if (enteredNumber < 1 || enteredNumber > 100) {
                throw "Please enter the number in the range 1-100";
            }
            remainingGuesses--;
            if (enteredNumber === generatedNum) {
                playerWinned = true;
                break;
            }
            if (remainingGuesses > 0) {
                previousGuesses.push(enteredNumber);
                hint =
                    enteredNumber > generatedNum
                        ? "Your guess is too high!"
                        : "Your guess is to low!";
            }
        }
        catch (error) {
            console.log(`${chalk.bold.red(chalk.bgWhite(error))}\n`);
        }
    } while (remainingGuesses > 0);
    if (playerWinned) {
        console.log(`\n${chalk.bold
            .hex("#29AB87")
            .bgWhite(`Correct! you got it in ${maxGuesses - remainingGuesses}`)}`);
    }
    else {
        console.log(`\n${chalk.bold.red(chalk.bgWhite(`Sorry! you lose`))}`);
    }
    const doUserContinues = await askToContinue();
    if (doUserContinues) {
        startGame();
    }
    else {
        const karaokeTitle = chalkAnimation.karaoke("Hope you enjoed it!");
        karaokeTitle.start();
        await sleep();
        karaokeTitle.stop();
        process.exit(0);
    }
}
userName = await askName();
await welcome();
startGame();
