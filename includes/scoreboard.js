class Scoreboard {
    constructor (size) {
        this._p1Score=0;
        this._movesLeft= size*size;
    }

    displayTimer() {

    }

    get score(){
        return this._score;
    }
    set p1Score(score){
        this._score=score;
    }

    get attemptsLeft(){
        return this._movesLeft - this._score-this.p2Score;
    }

    displayScore() {

    }

    reset() {
        this._p1Score = 0;
        this._p2Score = 0;
    }
}
