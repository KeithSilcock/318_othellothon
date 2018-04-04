class GameStartModel{
    constructor(){

    }
}

class GameStartView{
    constructor(){
        this.p1Input = $('.p1Input');
        this.p2Input = $('.p2Input');

        this.submitButton = $('.playersReady');

        this.handleClicks();
    }

    handleClicks(){
        debugger
        this.submitButton.on('click',this.playersPressReady.bind(this))
    }

    playersPressReady(){
        //make sure text is in input, selected colors
        //go to game page
        console.log(this.p1Input.val())
    }
}

class GameStartController{
    constructor(){

    }
}

document.ready(function () {
    var newGame = new GameStartController();
});