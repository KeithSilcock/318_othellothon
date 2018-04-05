class Player {
    constructor(name, color, img, num, scoreBoardDOM, time, timerCallBack) {
        this.name = name;
        this.color = color;
        this.img = img;
        this._num=num;

        this._score=2;

        if(!time){
            time=300; //5 mins
        }
        this.maxTime=time;
        this.currentTime = this.maxTime;
        this.timerObj=null;
        this.timerCallback=timerCallBack;

        if(this._num==='1'){
            this.playerTag='p1';
        }else{
            this.playerTag='p2';
        }

        this._movesLeft=64;

        this.displayPlayerStats();
    }

    startTimer(){
        this.timerObj = setInterval(this.countDown.bind(this), 1000)
    }

    countDown(){
        this.displayPlayerStats();
        if(--this.currentTime >= 0){
            console.log(this.currentTime)
        }else{
            //time ran out
            this.reset();
            this.stopTimer()
            this.timerCallback();
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



    displayPlayerStats() {
        $('.playerName.' + this.playerTag).text(this.name);
        $('.playerName.' + this.playerTag).css('background-color', this.getColor());

        $('.playerScore.'+ this.playerTag).text(this.score);

        $('.playerPlaysLeft.'+ this.playerTag).text('movesLeft: '+this._movesLeft);

        $('.playerTimer.'+ this.playerTag).text(this.minutes + ':' + this.seconds);

    }

}

