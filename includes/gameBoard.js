class GameBoard{
    constructor(){

    }
    createBoard(size){
        var boardSize = { rows: size, squares: size };
        var gameBoard = $('.gameBoard');
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
            gameBoard.append(rowMaker);
        }

    }

}
    attachHandler(){

    }
    spawnPiece(divClicked){

    }
    switchPlayer(){

    }
}