class Player {
    constructor(name, color, img, num, time, timerCallBack) {
        this.name = name;
        this.color = color;
        this.img = img;
        this._num=num;

        this._score=0;

        if(!time){
            time=300; //5 mins
        }
        this.maxTime=time;
        this.currentTime = this.maxTime;
        this.timerObj=null;
        this.timerCallback=timerCallBack;
        // this.movesLeft= size*size;
    }

    startTimer(){
        this.timerObj = setInterval(this.countDown.bind(this), 1000)
    }

    countDown(){
        if(--this.currentTime > 0){
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
    getName(name) {
        return this.name;
    }

    setColor(color) {
        this.color = color;
    }
    getColor(color) {
        return this.color;
    }

    get num(){
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

    displayPlayerStats() {
        $('.playerName').text(this.name);
        $('.playerScore').text(this._score);
        $('.playerPlaysLeft').text('movesLeft');
        $('.playerTimer').text(this.currentTime);
    }

}

