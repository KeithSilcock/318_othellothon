class GameStartModel{
    constructor(){

    }
}

class GameStartView{
    constructor(setPlayerNamesCallback){
        this.createBlackScreen();
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
    createBlackScreen(){
        var blackScreenDiv = $("<div>").addClass("blackScreen");
        $("body").prepend(blackScreenDiv);
        var ruleDiv = $("<div>").addClass("rules");
        blackScreenDiv.append(ruleDiv);
        var buttonDiv = $("<div>").addClass("startButton");
        blackScreenDiv.append(buttonDiv);
        // var blackScreenImg = $("<img>").addClass("popupImg").attr("src", imageUrl);
        // blackScreenDiv.append(blackScreenImg);
        blackScreenDiv.on("click", removeBlackScreen);
    }

    handleClicks(){
        this.submitButton.on('click',this.playersPressReady.bind(this))
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
    }
}

class GameStartController{
    constructor(){
        this._model = new GameStartModel();
        this._view = new GameStartView(this.getPlayerObj);
    }

    getPlayerObj(p1, p2){
        console.log(p1, p2);
        var newGame = new GameBoard(8, p1, p2);
    }
}

class Player {
    constructor(name, color, img, num) {
        this.name = name;
        this.color = color;
        this.img = img;
        this.num=num;
    }

    setName(name) {
        this.name = name;
    }

    getName(name) {
        return this.name;
    }

    setColor(color) {
        this.color = color;
    }

    getColor(color) {
        return this.color;
    }
    getPlayerNum(){
        return this.num;
    }

}

$(document).ready(function () {
    var newGame = new GameStartController();
});