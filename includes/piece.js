class Piece{
    constructor(playerObj){
        this.pieceDOM=null;
        this.owner=playerObj;

        // return this.renderPiece();
    }
    renderPiece(squareClicked){
        //var squareClicked = $(divClicked.target)


        this.pieceDOM = $("<div>",{
            'class':'piece',
            'coord': squareClicked.attr('coord'),
        });
        this.pieceDOM.attr({
            player: this.owner.num,
        });
        return this.pieceDOM
    }

    changeColor(colorToBe, imageToBe){
        // debugger
        if(!colorToBe){
            this.pieceDOM.css({
                'background-img': imageToBe,
            });
        }else {
            this.pieceDOM.css({
                'background-color': colorToBe,
            });
        }
        return this.pieceDOM;
    }
}