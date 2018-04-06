class GameStartView {
    constructor(setPlayerNamesCallback) {
        this.createStartScreen();
        this.p1Input = $('.p1Input');
        this.p2Input = $('.p2Input');

        this.submitButton = $('.playersReady');

        this.player1Name = null;
        this.player1Color = null;

        this.player2Name = null;
        this.player2Color = null;

        this.callback = setPlayerNamesCallback;

        this.handleClicks();
        this.player1 = new Player(this.player1Name, this.player1Color, null, '1');
        this.player2 = new Player(this.player2Name, this.player2Color, null, '2');
    }

    createStartScreen() {
        var blackScreenDiv = $("<div>").addClass("blackScreen");
        $(".container").prepend(blackScreenDiv);
        var ruleDiv = $("<div>").addClass("rules");

        ruleDiv.text("rule:")
        var ruleP = $("<p>", {
            'class': 'rulesParagraph',
            'text': 'The goal is to get the majority of colour discs on the board at the end of the game.',
        });
        ruleDiv.append(ruleP);

        blackScreenDiv.append(ruleDiv);
        var buttonDiv = $("<div>").addClass("startButton");
        buttonDiv.text("Start Game");
        ruleDiv.append(buttonDiv);
        buttonDiv.on("click", this.closeRuleScreen.bind(this));

        // add clicks for color divs
        $('.colorChoice').on('click', this.addColorToPlayer.bind(this));
    }

    addColorToPlayer(colorDivClicked) {
        var divClicked = $(colorDivClicked.target);
        var color = divClicked.css('background-color');
        if (divClicked.hasClass('p1')) {
            this.player1.setColor(color);
            $('.player1-piece').css('background-color', color);
        }else{

            this.player2.setColor(color);
            $('.player2-piece').css('background-color', color);
        }

        divClicked.css({
            'border': '3px solid black',
        })
    }

    closeRuleScreen() {
        $("div").remove(".rules");
        this.showPlayerSelect();
    }

    showPlayerSelect() {
        $(".gameStartContainer").removeClass("hideThis");
    }

    handleClicks() {
        this.submitButton.on('click', this.playersPressReady.bind(this))
    }

    closePlayerSelect() {
        $(".gameStartContainer").addClass("hideThis");
        $("div").remove(".blackScreen");
    }

    playersPressReady() {
        //make sure text is in input, selected colors
        //go to game page
        this.player1.setName(this.p1Input.val());
        this.player2.setName(this.p2Input.val());

        if (this.player1.getName() === '' || this.player2.getName() === '') {
            alert('You need to enter a valid name');
            return;
        }
        else if (this.player1.getColor() === null || this.player2.getColor() === null) {
            alert('You both need to select a color');
            return;
        }
        else if (this.player1.getColor() === this.player2.getColor()) {
            alert("You can't select the same color!");
            return;
        }

        this.callback(this.player1, this.player2);
        this.closePlayerSelect();

    }
}

class GameStartController{
    constructor(){
        this.view = new GameStartView(this.getPlayerObj);
    }
    getPlayerObj(p1, p2){
        var newGame = new GameBoard(8, p1, p2);
    }
}

$(document).ready(function () {
    var newGame = new GameStartController();
});

