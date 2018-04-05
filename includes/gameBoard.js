
class GameBoard {
    constructor(size, p1, p2) {
        this.gameBoard=$('.gameBoard');
        this.size=size;
        this.placedPiece=null;
        this.player1=p1; // needs end game on timer
        this.player2=p2;
        this.lastSquareCoords= null;
        this.currentPlayer=this.player1;
        this.otherPlayer=this.player2;

        this.twoDimensionArray = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,"1","2",0,0,0],
            [0,0,0,"2","1",0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];
        this.createBoard(this.size);
        this.attachHandler();

        this.player1.displayPlayerStats();
        this.player2.displayPlayerStats();
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
        this.lastSquareCoords = square.attr('coord');

        //check if empty and is a square
        if(this.getPlayerNumberFromArray(this.lastSquareCoords)===0 && square.hasClass('square')) {

            var allowed = this.callChecks();
            if(allowed) {
                this.currentPlayer.stopTimer();

                this.spawnPiece(divClicked);
                this.updateStorageArray(this.lastSquareCoords);


                this.updatePlayerScore();

                this.switchPlayer();
                this.currentPlayer.startTimer();
            }
        }

    }

    updatePlayerScore(){
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

        }
        this.player1.score=count1;
        this.player2.score=count2;
        this.currentPlayer.displayPlayerStats();
        this.otherPlayer.displayPlayerStats();

        // console.log(this.player1)
    }

    updateStorageArray(coords){
        console.log(this.twoDimensionArray)
        this.twoDimensionArray[coords[0]][coords[1]] = this.currentPlayer.getPlayerNum();
    }

    getPlayerNumberFromArray(coords){
        if(!coords){
            return;
        }
        return this.twoDimensionArray[coords[0]][coords[1]];
    }

    switchPlayer() {
        if (this.currentPlayer.getPlayerNum() === '1') {
            this.currentPlayer = this.player2;
            this.otherPlayer=this.player1;
        } else {
            this.currentPlayer = this.player1;
            this.otherPlayer=this.player2;
        }
    }
    spawnPiece(divClicked) {
        var newPiece = new Piece(this.currentPlayer);

        var squareClicked = $(divClicked.target);
        this.placedPiece = newPiece.renderPiece(squareClicked);
        this.placedPiece = newPiece.changeColor(this.currentPlayer.color);

        divClicked.target.append(this.placedPiece[0])
    }

    callChecks(){
        var arrayOfLegalMoves=[
            this.checkNorth(this.twoDimensionArray, this.currentPlayer, this.lastSquareCoords[0], this.lastSquareCoords[1]),
            this.checkEast(this.twoDimensionArray, this.currentPlayer, this.lastSquareCoords[0], this.lastSquareCoords[1]),
            this.checkSouth(this.twoDimensionArray, this.currentPlayer, this.lastSquareCoords[0], this.lastSquareCoords[1]),
            this.checkWest(this.twoDimensionArray, this.currentPlayer, this.lastSquareCoords[0], this.lastSquareCoords[1]),
            this.checkNorthEast(this.twoDimensionArray, this.currentPlayer, this.lastSquareCoords[0], this.lastSquareCoords[1]),
            this.checkNorthWest(this.twoDimensionArray, this.currentPlayer, this.lastSquareCoords[0], this.lastSquareCoords[1]),
            this.checkSouthEast(this.twoDimensionArray, this.currentPlayer, this.lastSquareCoords[0], this.lastSquareCoords[1]),
            this.checkSouthWest(this.twoDimensionArray, this.currentPlayer, this.lastSquareCoords[0], this.lastSquareCoords[1]),
        ];
        for(var index=0; index<arrayOfLegalMoves.length; index++){
            if(arrayOfLegalMoves[index]){
                return true;
            }else{
                continue
            }
        }
        return false;
    }

    flipPiecesInArray(arrayOfCoords){
        for(var coordIndex=0; coordIndex<arrayOfCoords.length; coordIndex++){
            var x=arrayOfCoords[coordIndex].xCord;
            var y=arrayOfCoords[coordIndex].yCord;
            //find object on page with this coord

            var pieceToFlip = $(`.piece[coord= '${y}${x}']`);
            this.changeColor(pieceToFlip);

            this.updateStorageArray(''+y+x);

        }
    }
    changeColor(domToChange){
        domToChange.css({
            'background-color': this.currentPlayer.color,
        });
        domToChange.attr('player', this.currentPlayer.num)
    }

    checkEast(arrayForCheck,currentPlayer,yDirection,xDirection) {
        var currentNum = currentPlayer.num;
        var piecesToFlip = [];
        var currentY = parseInt(yDirection);
        var currentX = parseInt(xDirection);
        for(var rowIndex = currentX+1; rowIndex < this.size; rowIndex++){
            if(arrayForCheck[currentY][rowIndex] === 0) {
                console.log("empty on east");
                return;
            }else{
                if (arrayForCheck[currentY][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        console.log("flip this shit")

                        //call flipColor Function
                        this.flipPiecesInArray(piecesToFlip)

                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        console.log("Nothing to Flip");
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:currentY, xCord:rowIndex})
                    console.log("push piece")
                }
            }
        }
    }

    checkWest(arrayForCheck,currentPlayer,yDirection,xDirection) {
        var currentNum = currentPlayer.num;
        var piecesToFlip = [];
        var currentY = parseInt(yDirection);
        var currentX = parseInt(xDirection);
        for(var rowIndex = currentX-1; rowIndex >= 0; rowIndex--){
            if(arrayForCheck[currentY][rowIndex] === 0) {
                console.log("empty on west");
                return;
            }else{
                if (arrayForCheck[currentY][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        console.log("flip this shit")
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        console.log("Nothing to Flip");
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:currentY, xCord:rowIndex})
                    console.log("push piece")
                }
            }
        }
    }

    checkNorth(arrayForCheck,currentPlayer,yDirection,xDirection) {
        var currentNum = currentPlayer.num;
        var piecesToFlip = [];
        var currentY = parseInt(yDirection);
        var currentX = parseInt(xDirection);
        for(var columnIndex = currentY-1; columnIndex >= 0; columnIndex--){
            if(arrayForCheck[columnIndex][currentX] === 0) {
                console.log("empty on North");
                return;
            }else{
                if (arrayForCheck[columnIndex][currentX] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        console.log("flip this shit")
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        console.log("Nothing to Flip");
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:currentX})
                    console.log("push piece")
                }
            }
        }
    }

    checkSouth(arrayForCheck,currentPlayer,yDirection,xDirection) {
        var currentNum = currentPlayer.num;
        var piecesToFlip = [];
        var currentY = parseInt(yDirection);
        var currentX = parseInt(xDirection);
        for(var columnIndex = currentY+1; columnIndex < this.size; columnIndex++){
            if(arrayForCheck[columnIndex][currentX] === 0) {
                console.log("empty on South");
                return;
            }else{
                if (arrayForCheck[columnIndex][currentX] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        console.log("flip this shit")
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        console.log("Nothing to Flip");
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:currentX})
                    console.log("push piece")
                }
            }
        }
    }

    checkNorthEast(arrayForCheck,currentPlayer,yDirection,xDirection){
        var currentNum = currentPlayer.num;
        var piecesToFlip = [];
        var currentY = parseInt(yDirection);
        var currentX = parseInt(xDirection);
        for(var rowIndex = currentX+1, columnIndex = currentY-1; rowIndex < this.size && columnIndex >=0; rowIndex++, columnIndex--){
            if(arrayForCheck[columnIndex][rowIndex] === 0) {
                console.log("empty on northeast");
                return;
            }else{
                if (arrayForCheck[columnIndex][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        console.log("flip this shit")
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        console.log("Nothing to Flip");
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:rowIndex})
                    console.log("push piece")
                }
            }
        }
    }

    checkNorthWest(arrayForCheck,currentPlayer,yDirection,xDirection){
        var currentNum = currentPlayer.num;
        var piecesToFlip = [];
        var currentY = parseInt(yDirection);
        var currentX = parseInt(xDirection);
        for(var rowIndex = currentX-1, columnIndex = currentY-1; rowIndex >=0 && columnIndex >=0; rowIndex--, columnIndex--){
            if(arrayForCheck[columnIndex][rowIndex] === 0) {
                console.log("empty on northwest");
                return;
            }else{
                if (arrayForCheck[columnIndex][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        console.log("flip this shit")
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        console.log("Nothing to Flip");
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:rowIndex})
                    console.log("push piece")
                }
            }
        }
    }

    checkSouthEast(arrayForCheck,currentPlayer,yDirection,xDirection){
        var currentNum = currentPlayer.num;
        var piecesToFlip = [];
        var currentY = parseInt(yDirection);
        var currentX = parseInt(xDirection);
        for(var rowIndex = currentX+1, columnIndex = currentY+1; rowIndex < this.size && columnIndex < this.size; rowIndex++, columnIndex++){
            if(arrayForCheck[columnIndex][rowIndex] === 0) {
                console.log("empty on southeast");
                return;
            }else{
                if (arrayForCheck[columnIndex][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        console.log("flip this shit")
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        console.log("Nothing to Flip");
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:rowIndex})
                    console.log("push piece")
                }
            }
        }
    }

    checkSouthWest(arrayForCheck,currentPlayer,yDirection,xDirection){
        var currentNum = currentPlayer.num;
        var piecesToFlip = [];
        var currentY = parseInt(yDirection);
        var currentX = parseInt(xDirection);
        for(var rowIndex = currentX-1, columnIndex = currentY+1; rowIndex >=0 && columnIndex < this.size; rowIndex--, columnIndex++){
            if(arrayForCheck[columnIndex][rowIndex] === 0) {
                console.log("empty on southwest");
                return;
            }else{
                if (arrayForCheck[columnIndex][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        console.log("flip this shit")
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        console.log("Nothing to Flip");
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:rowIndex})
                    console.log("push piece")
                }
            }
        }
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

