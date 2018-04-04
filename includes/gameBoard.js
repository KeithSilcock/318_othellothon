
class GameBoard {
    constructor(size, p1, p2) {
        this.gameBoard=$('.gameBoard');
        this.size=size;
        this.placedPiece=null;
        this.player1=p1;
        this.player2=p2;

        this.p1ScoreBoard = new Scoreboard(size);
        this.p2ScoreBoard = new Scoreboard(size);

        this.currentPlayer=this.player1; //obeject of name, color

        this.twoDimensionArray = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];
        this.createBoard(this.size);
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
                    squareMaker.attr({
                        'coord': ""+rowIndex+squareIndex
                        });

                } else if (rowIndex % 2 === 0 && squareIndex % 2 === 1 || rowIndex % 2 === 1 && squareIndex % 2 === 0) {
                    squareMaker.addClass("dark");
                    squareMaker.attr({
                        'coord': ""+rowIndex+squareIndex
                    });
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

    clickedBoard(divClicked) {
        var square = $(divClicked.target);
        var squareCoords = square.attr('coord');

        //check if empty and is a square
        if(this.getPlayerNumberFromArray(squareCoords)===0 && square.hasClass('square')) {
            this.spawnPiece(divClicked);
            this.updateStorageArray(squareCoords);

            // this.updateScoreBoard();

            this.switchPlayer();
        }

    }

    updateScoreBoard(){
        var allPiecesOnBoard = this.gameBoard.find('.piece');
        var count1 = 0;
        var count2 = 0;
        for(var pieceIndex=0; pieceIndex<allPiecesOnBoard.length; pieceIndex++){
            var piece = $(allPiecesOnBoard[pieceIndex]);

            //count how many for each player, send to scoreBoard
            if(piece.attr('player') === '1'){
                count1++;
            }else if(piece.attr('player') === '2'){
                count2++;
            }
            //set the counts to scoreboard
            this.p1ScoreBoard.score=count1;
            this.p2ScoreBoard.score=count2;
        }
        console.log(this.p1ScoreBoard.attemptsLeft)
    }

    updateStorageArray(coords){
        console.log(this.twoDimensionArray)
        this.twoDimensionArray[coords[0]][coords[1]] = this.currentPlayer.getPlayerNum();
    }

    getPlayerNumberFromArray(coords){
        return this.twoDimensionArray[coords[0]][coords[1]];
    }



    switchPlayer() {
        if (this.currentPlayer.getPlayerNum() === '1') {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
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
            }else{
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


    spawnPiece(divClicked) {
        var newPiece = new Piece(this.currentPlayer);
        this.placedPiece = newPiece.renderPiece(divClicked);
        this.placedPiece = newPiece.changeColor(this.placedPiece, this.currentPlayer.color);

        divClicked.target.append(this.placedPiece[0])

    }

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

    /*
    flipPieces() {
        var square = $(divClicked.target);
        var squareCoords = {x:square.attr('row'), y:square.attr('column')};
        for (index = squareCoords.x; index < this.size; index++) {

        }
    }
    */
}


// $(document).ready(function(){
//     var player1 = new Player('Harrison', 'blue', null, '1');
//     var player2 = new Player('Dona', 'white', null, '2');

//     var newGame = new GameBoard(8, player1, player2);
// })

