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
        var colorArray=['#009fd7', 'mediumpurple', 'indianred', 'darkred'];
        var blackScreenDiv = $("<div>").addClass("blackScreen");
        $(".container").prepend(blackScreenDiv);
        var ruleDiv = $("<div>").addClass("rules");

        ruleDiv.text("Rules:")

        var textArray = ['The game is over when neither player can add more syrup or the timer has run out.',
            'Usually, this means the board is full or you took too long.',
            'Your move consists of placing one drop of syrup on an empty square.',
            'You can capture vertical, horizontal, and diagonal waffle rows. Also, you can capture more than one row at once',
            'A clock is used to limit the length of your game. These clocks count the time that each player separately takes for making his or her own moves.',
            'The rules are very simple, if you run out of time, you lose the game, and thus must budget your time and your syrup output.']

        var ruleP = $("<p>", {
            'class': 'rulesParagraph',
            'text':'The aim of the game is to cover more of the waffle in your favorite flavor of syrup than your opponent.',
            css:{
                'font-size':'2.5em',
            },
        });

        var ruleUl = $("<ul>",{
            css:{
                "list-style-position": 'inside',
                'line-height':'2.5em',
            },
        });
        for(var textIndex in textArray){
            ruleUl.append($("<li>",{
                text: textArray[textIndex],
                css:{
                    'font-size':'1.4em',
                    color: colorArray[randomNumBetween(0, colorArray.length-1)],
                },
            }))
        }
        ruleDiv.append(ruleP, ruleUl);

        blackScreenDiv.append(ruleDiv);
        var buttonDiv = $("<div>").addClass("startButton");
        buttonDiv.text("Start Game").css('font-size', '3.0em');
        ruleDiv.append(buttonDiv);
        buttonDiv.on("click", this.closeRuleScreen.bind(this));

        // add clicks for color divs
        $('.colorChoice').on('click', this.addColorToPlayer.bind(this));

        function randomNumBetween(min, max) {
            var num = Math.floor(Math.random()*(max-min+1)+min);
            return num;
        }
    }

    addColorToPlayer(colorDivClicked) {
        var divClicked = $(colorDivClicked.target);
        var color = divClicked.css('background-color');
        if (divClicked.hasClass('p1')) {
            if(this.player1.getColor()) {
                $('.colorChoice.p1').css('border','none')
            }

            this.player1.setColor(color);
            $('.player1-piece').css('background-color', color);

        }else{
            if(this.player2.getColor()) {
                $('.colorChoice.p2').css('border','none')
            }
            this.player2.setColor(color);
            $('.player2-piece').css('background-color', color);
        }

        divClicked.css({
            'border': '5px solid black',
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

