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