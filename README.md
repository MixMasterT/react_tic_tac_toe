### Setup
1. Run npm install
2. Run webpack
3. Open index.html

### Game
This is basically just a practice exercise implementing clickable TicTacToe
in React

### Features

### 2 Ways to Play
User can choose either two player game with undo move and internally saved game history,
or single player game with AI opponent.

### Game history
As each move is made, the state of the board prior to that move is stored
in a history array (stack). If a player wishes to take a move back, clicking
the 'undo move' button will pop the previous game state off of the stack,
and set that as the current board.

### AI player
The AIPlayer for this game was developed over several stage. At first, I
tried to generate a possible results tree for each possible move, and return
a tree that resulted in a win, or one that didn't result in a loss. However,
that AI implementation was overly optimistic. It returned any move that could
possibly result in a win, ignoring the fact that many of those moves could
also result in a loss. Human players could easily defeat this implementation.

I then read a few blogs on the topic, and learned about the Minimax algorithm,
which is often used to implement TicTacToeAI. So I decided to apply that
algorithm to see if I could make it work. There was one trick I added that
made it work in my very simple recursive implementation. At the top level,
the scoreFactor is set to whatever value the caller passes in, but as deeper
nested recursive calls are made, the scoreFactor is divided by 10 at each
call. This makes an immediate win 10x more valuable than a win that comes
in the next move, and so on. This causes the AIPlayer to value shorter paths
to victory higher than longer ones, and ultimately made the difference between
the implementation being just OK (it won some and lost some) to being unbeatable.

### TickTacToeModule
Functionality that is required in both the TicTacToe React component, and
the AITicTacToePlayer JavaScript (ES6) class was factored out into a module
called TicTacToeModule. This module is an IIFE (Immediately Invoked Function
Expression) that defines some functions and makes them available by returning
an object that contains them.

### Future Features
Varying levels of difficulty will be added soon.
