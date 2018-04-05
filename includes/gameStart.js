class GameStartView{
    constructor(setPlayerNamesCallback){
        this.createStartScreen();
        this.p1Input = $('.p1Input');
        this.p2Input = $('.p2Input');

        this.submitButton = $('.playersReady');

        this.player1Name=null;
        this.player1Color=null;

        this.player2Name=null;
        this.player2Color=null;

        this.callback = setPlayerNamesCallback;

        this.handleClicks();
        this.player1 = new Player(this.player1Name, this.player1Color, null, 1);
        this.player2 = new Player(this.player2Name, this.player2Color, null, 2);
    }
    createStartScreen(){
        var blackScreenDiv = $("<div>").addClass("blackScreen");
        $(".container").prepend(blackScreenDiv);
        var ruleDiv = $("<div>").addClass("rules");
        ruleDiv.text("Rule:")
        blackScreenDiv.append(ruleDiv);
        var buttonDiv = $("<div>").addClass("startButton");
        buttonDiv.text("Start Game");
        ruleDiv.append(buttonDiv);
        buttonDiv.on("click", this.closeRuleScreen.bind(this));
    }
    closeRuleScreen(){
        $("div").remove(".rules");
        this.showPlayerSelect();
    }
    showPlayerSelect(){
        $(".gameStartContainer").removeClass("hideThis");
    }
    handleClicks(){
        this.submitButton.on('click',this.playersPressReady.bind(this))
    }
    closePlayerSelect(){
        $(".gameStartContainer").addClass("hideThis");
        $("div").remove(".blackScreen");
    }
    playersPressReady(){
        //make sure text is in input, selected colors
        //go to game page
        if(this.player1Name==='' || this.player2Name===''){
            alert('You need to enter a valid name')
        }
        this.player1.setName(this.p1Input.val());
        this.player2.setName(this.p2Input.val());

        this.player1.setColor('blue');//do later
        this.player2.setColor('red');//do later

        this.callback(this.player1, this.player2)
        this.closePlayerSelect();
        this.spawnStartPieces();
    }
    spawnStartPieces(){
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
}

class GameStartController{
    constructor(){
        this._view = new GameStartView(this.getPlayerObj);
    }

    getPlayerObj(p1, p2){
        // console.log(p1, p2);
        // var newGame = new GameBoard(8, p1, p2);

        var player1 = new Player('Harrison', 'blue', null, '1');
        var player2 = new Player('Dona', 'red', null, '2');

        var newGame = new GameBoard(8, player1, player2);

    }
}
$(document).ready(function () {
    var newGame = new GameStartController();
});