
class GameBoard {
    constructor() {
      this.gameBoard=$('.gameBoard');
        this.size=size;
        this.placedPiece=null;
        this.player1=null;
        this.player2=null;

        this.currentPlayer={name:'dan', 'color':'blue'}; //obeject of name, color
      
        this.twoDimensionArray = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ]
        this.createBoard(8);
      this.attachHandler();
    }

    createBoard(size) {
        var boardSize = {rows: size, squares: size};
        var rowNumber = boardSize.rows;
        for (var rowIndex = 0; rowIndex < rowNumber; rowIndex++) {
            var rowMaker = $("<div>").addClass("row");
            for (var squareIndex = 0; squareIndex < rowNumber; squareIndex++) {
                var squareMaker = $("<div>").addClass('square');
                if (rowIndex % 2 === 0 && squareIndex % 2 === 0 || rowIndex % 2 === 1 && squareIndex % 2 === 1) {
                    squareMaker.addClass("light");
                } else if (rowIndex % 2 === 0 && squareIndex % 2 === 1 || rowIndex % 2 === 1 && squareIndex % 2 === 0) {
                    squareMaker.addClass("dark");
                } else {
                    console.log("GameBoard error");
                }
                rowMaker.append(squareMaker);
            }
            this.gameBoard.append(rowMaker);
        }

    }


    attachHandler(){
        this.gameBoard.on('click', this.clickedBoard.bind(this))
    }

    clickedBoard(divClicked){
        this.spawnPiece(divClicked);



    switchPlayer() {

    }

    checkEast(arrayForCheck,currentPlayer,opponent,yDirection,xDirection) {
        var currentNum = currentPlayer;
        var opponentNum = opponent;
        var piecesToFlip = [];
        var currentY = yDirection;
        var currentX = xDirection;
        for(var rowIndex = x; rowIndex < size; rowIndex++){
            if(arrayForCheck[y][rowIndex] === 0) {
                console.log("empty on east");
                else{
                    if (arrayForCheck[y][rowIndex] === currentNum) {
                        if (piecesToFlip.length !== 0) {
                            //call flipColor Function
                            //flip color on the board and numbers in the twoDimensionArray
                        } else {
                            console.log("Nothing to Flip");
                        }
                    } else {
                        piecesToFlip.push({yCord:y, xCord:rowIndex})
                    }
                }
            }
        }
    }

    spawnPiece(divClicked){
        var newPiece = new Piece(this.currentPlayer);
        this.placedPiece = newPiece.renderPiece();
        this.placedPiece = newPiece.changeColor(this.placedPiece, this.currentPlayer.color);

        divClicked.target.append(this.placedPiece[0])


    checkWest({y:yDirection,x:xDirection}) {


        divClicked.target.append(this.placedPiece[0])
    }

    checkNorth({y:yDirection,x:xDirection}) {

    }

    checkSouth({y:yDirection,x:xDirection}) {

    }

    checkNorthEast({y:yDirection,x:xDirection}){

    }

    checkNorthWest({y:yDirection,x:xDirection}){

    }

    checkSouthEast({y:yDirection,x:xDirection}){

    }

    checkSouthWest({y:yDirection,x:xDirection}){

    }

}

$(document).ready(function(){
    var newGame = new GameBoard(8);
})