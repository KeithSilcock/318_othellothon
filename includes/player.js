class Player {
    constructor(name, color, img, num, restartGame) {
        this.name = name;
        this.color = color;
        this.img = img;
        this._num=num;

        this._score=2;

        this.maxTime=300; //5 mins
        this.currentTime = this.maxTime;
        this.timerObj=null;
        this.restartCallback=restartGame;
        this.loseFunction = null;

        if(this._num==='1'){
            this.playerTag='p1';
        }else{
            this.playerTag='p2';
        }

        this._movesLeft=64;

        this.displayPlayerStats();
    }

    setLoseFunction(loseFunc){
        this.loseFunction=loseFunc;
    }

    startTimer(){
        this.timerObj = setInterval(this.countDown.bind(this), 1000)
    }

    countDown(){
        this.displayPlayerStats();
        if(--this.currentTime >= 296){
            console.log(this.currentTime)
        }else{
            //time ran out
            this.reset();
            this.stopTimer()
            this.loseFunction(this.name)
            // this.loserCallback();
        }
    }

    stopTimer(){
        clearInterval(this.timerObj)
    }

    reset() {
        this.score = 0;
        this.currentTime = this.maxTime;
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }

    set movesLeft(number){
        this._movesLeft=number;
    }

    setColor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }

    get num(){
        return this._num;
    }

    getPlayerNum(){
        return this._num;
    }

    getPlayerNum(){
        return this._num;
    }

    get score(){
        return this._score;
    }
    set score(newScore){
        this._score=newScore;
    }

    get minutes() {
        var minutes = Math.floor(this.currentTime / 60);
        return minutes
    }

    get seconds() {
        var second = Math.floor(this.currentTime % 60);
        if (second < 10) {
            second = '0' + second;
        }
        return second;
    }
    lose(){
        var blackScreenDiv = $("<div>").addClass("blackScreen");
        $(".container").prepend(blackScreenDiv);

        var loseDiv = $("<div>").addClass("lose");
        loseDiv.text("no waffle for losers")

        var playerLost =  $("<h1>").addClass("playerLost");
        playerLost.text(this.name + " lost!")
        loseDiv.append(playerLost);

        var loseImg = $("<img>").addClass("loseImg");
        loseDiv.append(loseImg);

        blackScreenDiv.append(loseDiv);

        var buttonDiv = $("<div>").addClass("restart");
        buttonDiv.text("more waffles");

        loseDiv.append(buttonDiv);
        buttonDiv.on("click", this.restartCallback);

    }

    displayPlayerStats() {
        $('.playerName.' + this.playerTag).text(this.name);
        $('.playerName.' + this.playerTag).css('background-color', this.getColor());

        $('.playerScore.'+ this.playerTag).text(this.score);

        $('.playerPlaysLeft.'+ this.playerTag).text('movesLeft: '+this._movesLeft);

        $('.playerTimer.'+ this.playerTag).text(this.minutes + ':' + this.seconds);

    }

}

