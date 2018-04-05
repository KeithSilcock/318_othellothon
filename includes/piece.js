class Piece{
    constructor(playerObj){
        this.pieceDOM=null;
        this.owner=playerObj;

        this.currentPiece=null;
        this.pourRate=10;
        this.pourIntervalTimer=null;

        // return this.renderPiece();
    }
    renderPiece(squareClicked){
        //var squareClicked = $(divClicked.target)


        this.pieceDOM = $("<div>",{
            'class':'piece',
            'coord': squareClicked.attr('coord'),
            css:{
                left:'50%',
                top:'50%',
                transform: "translate(-50%, -50%)"
            }
        });
        this.pieceDOM.attr({
            player: this.owner.num,
        });

        //Start pour mechanics
        console.log('starting to pour')
        this.currentPiece = this.pieceDOM[0];
        this.currentPiece.currentHeight = 5;
        this.currentPiece.currentWidth =  5;

        this.pourIntervalTimer = setInterval(this.continueSyrupPour.bind(this), 100);

        // setTimeout(,500);

        return this.pieceDOM
    }

    continueSyrupPour(){
        var currentPos = $(this.currentPiece).position();
        this.currentPiece.currentHeight += this.pourRate;
        this.currentPiece.currentWidth += this.pourRate;

        currentPos.left -= this.pourRate/2;
        currentPos.top -= this.pourRate/2;

        $(this.currentPiece).css({
            left: this.currentPiece.left + '%',
            top: this.currentPiece.top + '%',
            height: this.currentPiece.currentHeight+'%',
            width: this.currentPiece.currentWidth+'%'
        });
        if(this.currentPiece.currentHeight>=100){
            this.stopPouring();
        }
        console.log('pouring')
    }

    stopPouring(){
        console.log("stopped pouring");
        clearInterval(this.pourIntervalTimer);
        this.pourIntervalTimer=null;
    }

    changeColor(colorToBe, imageToBe, piece){
        if(!piece){
            piece=this.pieceDOM;
        }
        if(!colorToBe){
            piece.css({
                'background-img': imageToBe,
            });
        }else {
            piece.css({
                'background-color': colorToBe,
            });
        }
        return piece;
    }
}


