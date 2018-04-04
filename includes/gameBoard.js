class GameBoard{
    constructor(size){
        this.gameBoard=$('.gameBoard');
        this.size=size;
        this.placedPiece=null;
        this.player1=null;
        this.player2=null;

        this.currentPlayer={name:'dan', 'color':'blue'}; //obeject of name, color
        this.createBoard(this.size);

        this.attachHandler();
    }
    createBoard(size){
        var boardSize = { rows: size, squares: size };
        var rowNumber = boardSize.rows;
        for (var rowIndex= 0; rowIndex < rowNumber; rowIndex++){
            var rowMaker = $("<div>").addClass("row");
            for (var squareIndex = 0; squareIndex < rowNumber; squareIndex++){
                var squareMaker = $("<div>").addClass('square');
                if(rowIndex % 2 === 0 && squareIndex % 2 === 0 || rowIndex % 2 === 1 && squareIndex % 2 === 1){
                    squareMaker.addClass("light");
                } else if(rowIndex % 2 === 0 && squareIndex %2 === 1 || rowIndex % 2 === 1 && squareIndex %2 === 0){
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

    }
    spawnPiece(divClicked){
        var newPiece = new Piece(this.currentPlayer);
        this.placedPiece = newPiece.renderPiece();
        this.placedPiece = newPiece.changeColor(this.placedPiece, this.currentPlayer.color);

        divClicked.target.append(this.placedPiece[0])
    }
    switchPlayer(){

    }
}
$(document).ready(function(){
    var newGame = new GameBoard(8);
})