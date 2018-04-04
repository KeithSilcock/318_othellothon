class Scoreboard {
    constructor () {

    }

    displayTimer() {

    }

    addToScore(amount) {
        this.score += amount;
    }

    removeFromScore(amount) {
        this.score -= amount
    }

    setScore(amount) {
        this.score = amount;
    }

    getScore() {
        return this.score;
    }

    displayScore() {

    }

    attempsLeft() {

    }

    reset() {
        this.score = 0;
    }
}
