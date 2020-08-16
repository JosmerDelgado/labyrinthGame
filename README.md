# Making Sense Labyrinth technical challenge

> This challenge requires you to build a small application that works as a game using React.js.

<br />

## The rules of the final game are the following:
> * You (the black and white circle) start at a customizable initial position
> <br/> ![Initial](screen-initial.png)
> * You can move using your keyboard's arrows (up/down/left/right)
> * Your objective is to move from the initial cell (yellow) to the target cell (green) before you run out of moves:
> <br/> ![Win](screen-win.png)
> * When you win, you will get a "You won" message and won't be able to move any more
> * If you do run out of moves before you reach the target cell, then you lose:
> <br/> ![Lose](screen-lose.png)
> * When you lose, you will get a "You lost" message and won't be able to move any more

<br />

## Technical requirements
* You can add any library you consider will help you build or test the game as long as they are "regular web application" libraries. That means you can use libraries that help you with styles, state management, testing, etc, but not libraries that are meant exclusively for building games.
* You have to pass the `unit tests` written in the `Labyrinth.test.tsx` file, but you can change those tests and the component's props if you consider that doing so might lead you to a better result.
* You have to test the application/components covering more functionality than the one covered by the provided tests.
* You have to build this application to the best of your abilities considering customization and the possibiility of extending it in the future.

<br />

## Nice to have
> Not doing these items **WON'T** be penalized and **you are not required to do any of them**, but if you do decide to do some of them, they might add to your *score* always considering code quality
* Styling (for example the circle/cells can be images or have movement/direction animations)
* Restart functionality
* Level progression (win and go the next level) 
* High scores
* Level builder
* War fog
* Anything you think might add value
