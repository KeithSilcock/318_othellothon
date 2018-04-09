class Player {
    constructor(name, color, img, num, restartGame) {
        this.name = name;
        this.color = color;
        this.img = img;
        this._num=num;

        this._cursor=null;

        this._score=2;

        this.maxTime=120; //5 mins
        this.currentTime = this.maxTime;
        this.timerObj=null;
        this.restartCallback=restartGame;
        this.loseFunction = null;

        if(this._num==='1'){
            this.playerTag='p1';
        }else{
            this.playerTag='p2';
        }

        this._movesLeft=60;

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
        if(--this.currentTime >= 0){
        }else{
            //time ran out
            this.loseFunction(this.name)
            this.stopTimer();
        }
    }

    stopTimer(){
        clearInterval(this.timerObj)
    }

    reset() {
        this.score = 2;
        this.currentTime = this.maxTime;
        this.stopTimer();
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
        this.cursor=color;
    }
    getColor() {
        return this.color;
    }

    get cursor(){
        return this._cursor;
    }
    set cursor(imageName){
        this._cursor="includes/images/"+imageName+'.png';
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

    displayPlayerStats() {
        $('.playerName.' + this.playerTag).text(this.name);
        $('.playerScore.'+ this.playerTag).text('x ' + this.score);

        $('.playerName.' + this.playerTag).css('background-color', this.getColor());

        $('.playerPlaysLeft.'+ this.playerTag).text('movesLeft: '+this._movesLeft);

        $('.playerTimer.'+ this.playerTag).text(this.minutes + ':' + this.seconds);
    }

}

