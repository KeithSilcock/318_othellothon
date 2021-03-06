
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

        this.player1.setLoseFunction(this.loseGameFunction.bind(this));
        this.player2.setLoseFunction(this.loseGameFunction.bind(this));

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
        this.notifyPlayerTurn();
        this.spawnStartPieces();
        this.updatePlayerScore();
    }

    spawnStartPieces() {
        var position33 = $("div[coord= '33']");
        var position34 = $("div[coord= '34']");
        var position43 = $("div[coord= '43']");
        var position44 = $("div[coord= '44']");

        var newPieceC33 = new Piece(this.player1);
        var placedPieceforC33 = newPieceC33.renderPiece(position33);
        newPieceC33.changeColor(this.player1.color);

        var newPieceC44 = new Piece(this.player1);
        var placedPieceforC44 = newPieceC44.renderPiece(position44);
        newPieceC44.changeColor(this.player1.color);

        position33.append(placedPieceforC33);
        position44.append(placedPieceforC44);

        var newPieceC34 = new Piece(this.player2);
        var placedPieceforC34 = newPieceC34.renderPiece(position34);
        newPieceC34.changeColor(this.player2.color);

        var newPieceC43 = new Piece(this.player2);
        var placedPieceforC43 = newPieceC43.renderPiece(position43);
        newPieceC43.changeColor(this.player2.color);

        position34.append(placedPieceforC34);
        position43.append(placedPieceforC43);
    }

    createGameEndScreen(playerWhoWon) {
        playerWhoWon=playerWhoWon.toLowerCase();
        var blackScreenDiv = $("<div>").addClass("blackScreen");
        $(".container").prepend(blackScreenDiv);

        var WinDiv = $("<div>").addClass("win");
        WinDiv.text("winner winner waffle dinner")

        var playerWon = $("<h1>").addClass("playerWon");
        playerWon.text(playerWhoWon + " won!")
        WinDiv.append(playerWon);

        var WinImg = $("<img>").addClass("winImg");
        WinDiv.append(WinImg);

        blackScreenDiv.append(WinDiv);

        var buttonDiv = $("<div>").addClass("restart");
        buttonDiv.text("more waffles");

        WinDiv.append(buttonDiv);
        buttonDiv.on("click", this.restartGame.bind(this));
    }
    loseGameFunction(winner){
        this.reset();
        var winPlayer=winner;
        this.createGameEndScreen(winPlayer);
    }
    restartGame(){
        $("div").remove(".blackScreen");
        this.reset();
    }
    reset(){
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
        this.placedPiece=null;
        this.lastSquareCoords= null;
        this.currentPlayer=this.player1;
        this.otherPlayer=this.player2;
        this.notifyPlayerTurn();

        $('.piece').remove();
        this.spawnStartPieces();
        this.player1.reset();
        this.player2.reset();
        this.updatePlayerScore();
    }
    createBoard(size) {
        var boardSize = {rows: size, squares: size};
        var rowNumber = boardSize.rows;
        for (var rowIndex = 0; rowIndex < rowNumber; rowIndex++) {
            var fakeRow = $("<div>").addClass("fakeRow");
            var rowMaker = $("<div>").addClass("row");
            for (var squareIndex = 0; squareIndex < rowNumber; squareIndex++) {
                var fakesquare = $("<div>").addClass('fakeSquare');
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
                    // console.log("GameBoard error");
                }
                rowMaker.append(squareMaker);
                fakeRow.append(fakesquare);
            }
            $(".playerBox").append(fakeRow);
            this.gameBoard.append(rowMaker);
        }

    }

    attachHandler(){
        this.gameBoard.on('click', this.clickedBoard.bind(this));
        $(".resetButton").on('click', this.reset.bind(this));
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
                this.playAudio();
                this.updateStorageArray(this.lastSquareCoords);


                this.updatePlayerScore();

                this.switchPlayer();
                this.currentPlayer.startTimer();
            }
        }

    }
    playAudio(){
        var audio = new Audio('./includes/audio/syrup_sound.mp3');
        audio.play();
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

        var player1MovesLeft=(this.size*this.size)-(count1+count2);
        var player2MovesLeft=(this.size*this.size)-(count1+count2);
        if(player1MovesLeft===0){
            this.createGameEndScreen(this.player1.name);
            return;
        }else if(player2MovesLeft===0){
            this.createGameEndScreen(this.player2.name);
            return
        }

        this.player1.movesLeft=player1MovesLeft;
        this.player2.movesLeft=player2MovesLeft;



        this.currentPlayer.displayPlayerStats();
        this.otherPlayer.displayPlayerStats();

        // console.log(this.player1)
    }

    updateStorageArray(coords){
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
        this.notifyPlayerTurn();
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
                return;
            }else{
                if (arrayForCheck[currentY][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {

                        //call flipColor Function
                        this.flipPiecesInArray(piecesToFlip)

                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:currentY, xCord:rowIndex})
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
                return;
            }else{
                if (arrayForCheck[currentY][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:currentY, xCord:rowIndex})
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
                return;
            }else{
                if (arrayForCheck[columnIndex][currentX] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:currentX});
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
                return;
            }else{
                if (arrayForCheck[columnIndex][currentX] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:currentX});
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
                return;
            }else{
                if (arrayForCheck[columnIndex][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:rowIndex})
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
                return;
            }else{
                if (arrayForCheck[columnIndex][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:rowIndex});
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
                return;
            }else{
                if (arrayForCheck[columnIndex][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:rowIndex})
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
                return;
            }else{
                if (arrayForCheck[columnIndex][rowIndex] === currentNum) {
                    if (piecesToFlip.length !== 0) {
                        this.flipPiecesInArray(piecesToFlip);
                        //flip color on the board and numbers in the twoDimensionArray
                        return true;
                    } else {
                        return;
                    }
                } else {
                    piecesToFlip.push({yCord:columnIndex, xCord:rowIndex})
                }
            }
        }
    }

    notifyPlayerTurn(){
        if (this.currentPlayer.num === '1') {
            $('.playerName.p1').css({'box-shadow': '0px 0px 60px 30px rgba(255,143,5,1)'});
            $('.playerName.p2').css({'box-shadow': 'none'});

            $('')

        } else {
            $('.playerName.p1').css({'box-shadow': 'none'});
            $('.playerName.p2').css({'box-shadow':  '0px 0px 60px 30px rgba(255,143,5,1)'});
        }
    }
}


// $(document).ready(function(){
//     var player1 = new Player('Harrison', 'blue', null, '1');
//     var player2 = new Player('Dona', 'white', null, '2');

//     var newGame = new GameBoard(8, player1, player2);
// })

