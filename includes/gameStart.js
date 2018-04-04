class GameStartModel{
    constructor(){

    }
}

class GameStartView{
    constructor(setPlayerNames){
        this.p1Input = $('.p1Input');
        this.p2Input = $('.p2Input');

        this.submitButton = $('.playersReady');

        this.player1Name=null;
        this.player1Color=null;

        this.player2Name=null;
        this.player2Color=null;

        this.callback = setPlayerNames;

        this.handleClicks();
    }

    handleClicks(){
        this.submitButton.on('click',this.playersPressReady.bind(this))
    }

    playersPressReady(){
        //make sure text is in input, selected colors
        //go to game page
        this.player1Name = this.p1Input.val();
        this.player2Name = this.p2Input.val();

        if(this.player1Name==='' || this.player2Name===''){
            alert('You need to enter a valid name')
        }

        this.player1Color = null;
        this.player2Color = null;

        this.callback(this.player1Name, this.player2Name)
    }
}

class GameStartController{
    constructor(){
        this._model = new GameStartModel();
        this._view = new GameStartView(this.getPlayerNames);

}

    getPlayerNames(name1, name2){
        console.log(name1, name2)
    }
}

$(document).ready(function () {
    var newGame = new GameStartController();
});